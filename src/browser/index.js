import * as cv from "../../vendor/opencv.js";
import PreProcessor from "../visual-inference/pre-processor";
import TemplateProcessor from "../visual-inference/template-processor";
import TemplateMatcher from "../visual-inference/template-matcher";
import DomGenerator from "../dom/generation/dom-generator";
import ContourProcessor from "../visual-inference/contour-processor.js";
import ColorExtractor from "../visual-inference/color-extractor.js";
import TreeValidator from "../dom/validation/tree-validator.js";
import { SupportedOptions } from "../dom/supported-features";
import DomComparator from "../dom/compare/dom-comparator"


const loadDOM = () => {
    return new Promise(resolve => {
        window.onload = resolve;
    });
}

const loadOpenCV = () => {
    return new Promise(resolve => {
        cv.onRuntimeInitialized = resolve;
    });
}

(async () => {
    await loadDOM();
    await loadOpenCV();
    console.log("opencv loaded");
    canvasToDOM("app");
})();

const getValidOptions = (options = {}) => {
    for (const option in SupportedOptions) {
        if (option in options) {
            if (!SupportedOptions[option].supported.includes(options[option].toLowerCase())) {
                throw new Error(`Unsupported value '${options[option]}' for option '${option}'`);
            }
        } else {
            options[option] = SupportedOptions[option].default;
        }
    }
    return options;
}

const canvasToDOM = (canvasEl, options) => {
    options = getValidOptions(options);

    let src;
    try {
        src = cv.imread(canvasEl);
    } catch (e) {
        throw new Error(`Given canvas element is invald, ${e.message}`);
    }
    let dst = src.clone();

    const colorExtractor = new ColorExtractor(src);
    const preProcessor = new PreProcessor(dst);
    preProcessor.binarize();

    const contourProcessor = new ContourProcessor(dst, colorExtractor);

    if (options.type == "json") return contourProcessor.shapeTree;

    const domGenerator = new DomGenerator(contourProcessor.shapeTree);

    if (options.type == "text/html") return domGenerator.dom;

    return new DOMParser().parseFromString(domGenerator.dom, "text/html");
}


const getValidShapeTreeFromElement = (element) => {
    if (element.constructor != String &&
        element.constructor != Object &&
        element.constructor != HTMLDocument) {
        throw new Error(`Given element argument has wrong format`);
    }
    if (element.constructor == Object) {
        try {
            const domGenerator = new DomGenerator(element);
            element = domGenerator.dom;
        } catch (e) {
            throw new Error(`Could not generate dom from given element, ${e.message}`);
        }
    }
    if (element.constructor == String) {
        element = new DOMParser().parseFromString(element, "text/html");
    }
    const treeValidator = new TreeValidator(element);
    if (!treeValidator.isValid) {
        throw new Error(treeValidator.error);
    }
    return element;
}

const canvasDOMCompare = (firstEl, secondEl) => {
    //TODO: compare two Documents
    const domComparator = new DomComparator(getValidShapeTreeFromElement(firstEl), getValidShapeTreeFromElement(secondEl));
    return domComparator.areEqual(); // TODO: implement options
}

