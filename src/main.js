import * as cv from "../vendor/opencv.js";
import PreProcessor from "./visual-inference/pre-processor";
import DomGenerator from "./dom/generation/dom-generator";
import ContourProcessor from "./visual-inference/contour-processor.js";
import ColorExtractor from "./visual-inference/color-extractor.js";
import { SupportedOptions } from "./dom/supported-features";
import { getValidShapeTreeFromElement } from "./helpers";
import DomComparator from "./dom/compare/dom-comparator"
import ComplexShapesProcessor from "./visual-inference/complex-shapes-processor.js";
import { Visualizer } from "./visualizer.js";


export const loadDOM = () => {
    return new Promise(resolve => {
        window.onload = resolve;
    });
}

export const loadOpenCV = () => {
    return new Promise(resolve => {
        cv.onRuntimeInitialized = resolve;
    });
}

export const loadCanvasToDom = () => {
    return new Promise(resolve => {
        loadOpenCV().then(() => {
            resolve();
        })
    });
}

const getValidOptions = (options = {}) => {
    for (const option in SupportedOptions) {
        if (option in options) {
            if ("supported" in SupportedOptions[option]) {
                if (!SupportedOptions[option].supported.includes(options[option])) {
                    throw new Error(`Unsupported value '${options[option]}' for option '${option}'`);
                }
            } else {
                for (let givenProperty in options[option]) {
                    if (!SupportedOptions[option].supportedProperties.includes(givenProperty)) {
                        throw new Error(`Unsupported property '${givenProperty}' for option '${option}'`);
                    }
                }
                for (let requiredProperty of SupportedOptions[option].requiredProperties) {
                    if (!(requiredProperty in options[option])) {
                        throw new Error(`Property '${requiredProperty}' is required for option '${option}'`);
                    }
                }
            }
        } else {
            options[option] = typeof(SupportedOptions[option].default) == "object" ?
                Object.assign({}, SupportedOptions[option].default) :
                SupportedOptions[option].default;
        }
    }
    return options;
}

export const canvasToDOM = (canvasEl, options) => {
    options = getValidOptions(options);

    let src;
    try {
        const canvas = typeof(canvasEl) == "string" ? document.getElementById(canvasEl) : canvasEl;
        const context = canvas.getContext("2d");
        const imgData = context.getImageData(
            options.fragment.x ? options.fragment.x : 0,
            options.fragment.y ? options.fragment.y : 0,
            options.fragment.width ? options.fragment.width : canvas.width,
            options.fragment.height ? options.fragment.height : canvas.height,
        );
        src = cv.matFromImageData(imgData);
    } catch (e) {
        throw new Error(`Cannot process given canvas, ${e.message}`);
    }
    let dst = src.clone();

    const colorExtractor = new ColorExtractor(src);
    const preProcessor = new PreProcessor(dst);
    dst = preProcessor.binarize();

    const complexShapesProcessor = new ComplexShapesProcessor(src.clone());

    const contourProcessor = new ContourProcessor(dst, colorExtractor, complexShapesProcessor);

    if (options.type == "json") return contourProcessor.shapeTree;

    const domGenerator = new DomGenerator(contourProcessor.shapeTree);

    if (options.type == "text/html") return domGenerator.dom;

    return new DOMParser().parseFromString(domGenerator.dom, "text/html");
}

export const canvasDOMCompare = (firstEl, secondEl, options) => {
    if (!firstEl || !secondEl) return false;
    try {
        const domComparator = new DomComparator(getValidShapeTreeFromElement(firstEl), getValidShapeTreeFromElement(secondEl));
        return domComparator.areEqual(options);
    } catch (e) {
        console.log(e);
        return false;
    }

}

export const visualize = (node, resultPlaceholder) => {
    const visualizer = new Visualizer();
    visualizer.render(node, resultPlaceholder);
}