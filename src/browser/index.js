import * as cv from "../../vendor/opencv.js";
import PreProcessor from "../visual-inference/pre-processor";
import TemplateProcessor from "../visual-inference/template-processor";
import TemplateMatcher from "../visual-inference/template-matcher";
import DomGenerator from "../dom/generation/dom-generator";
import ContourProcessor from "../visual-inference/contour-processor.js";
import ColorExtractor from "../visual-inference/color-extractor.js";
import TreeValidator from "../dom/validation/tree-validator.js";


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
    canvasToDom("app");
})();


const sampleOptions = {
};

const canvasToDom = (canvasEl, options = sampleOptions) => {
    let src = cv.imread(canvasEl);
    let dst = src.clone();

    const colorExtractor = new ColorExtractor(src);
    const preProcessor = new PreProcessor(dst);
    preProcessor.binarize();

    const contourProcessor = new ContourProcessor(dst, colorExtractor);
    const domGenerator = new DomGenerator({
        "identity": "canvas",
        "children": [contourProcessor.shapeTree]
    });
    const document = new DOMParser().parseFromString(domGenerator.dom, "text/html");
    const treeValidator = new TreeValidator(document);
    if (treeValidator.isValid) {
        console.log(treeValidator.shapeTree);
    } else {
        console.log(treeValidator.error);
    }
}

