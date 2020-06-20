import * as cv from "../../vendor/opencv.js";
import PreProcessor from "../visual-inference/pre-processor";
import TemplateProcessor from "../visual-inference/template-processor";
import TemplateMatcher from "../visual-inference/template-matcher";
import DomGenerator from "../dom/generation/dom-generator";
import ContourProcessor from "../visual-inference/contour-processor.js";
import ColorExtractor from "../visual-inference/color-extractor.js";
import TreeValidator from "../dom/validation/tree-validator.js";
import { SupportedOptions } from "../dom/supported-features";

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
    let dom = canvasToDOM("app");
    console.log(dom);
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
    console.log(options);
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