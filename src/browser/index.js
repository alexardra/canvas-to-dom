import * as cv from "../../vendor/opencv.js";
import PreProcessor from "../visual-inference/pre-processor";
import TemplateProcessor from "../visual-inference/template-processor";
import TemplateMatcher from "../visual-inference/template-matcher";
import DomGenerator from "../dom/generation/dom-generator";
import ContourProcessor from "../visual-inference/contour-processor.js";
import ColorExtractor from "../visual-inference/color-extractor.js";
import TreeValidator from "../dom/validation/tree-validator.js";

import infoInstance from "../../tests/mocks/simple-info-hierarchy.json";


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
    await canvasToDom("app");
})();



// // nothing yet, will be added when neccessary
const sampleOptions = {
    colorSpace: "YCbCr"
};

const canvasToDom = async (canvasEl, options = sampleOptions) => {
    let src = cv.imread(canvasEl);
    let dst = src.clone();

    const colorExtractor = new ColorExtractor(src);
    const srcPreProcessor = new PreProcessor(dst);

    const testContourProcessor = new ContourProcessor(dst, colorExtractor);
    // console.log([testContourProcessor.shapeTree]);
    // console.log(infoInstance);
    let domGenerator = new DomGenerator(infoInstance.canvas);
    domGenerator.generate();

    console.log(domGenerator.getDom());

    // const doc = new DOMParser().parseFromString(domGenerator.getDom(), "text/html");
    // const treeValidator = new TreeValidator(doc);

    // if (treeValidator.isValid) {
    //     console.log(treeValidator.shapeTree);
    // } else {
    //     console.log(treeValidator.error);
    // }

    // cv.imshow('dst', dst);
}

const erode_boundaries = (mat) => {
    // let src = cv.imread('canvasInput');
    // let dst = new cv.Mat();
    let kernel = cv.Mat.ones(2, 2, cv.CV_8U);
    let anchor = new cv.Point(-1, -1);

    cv.erode(mat, mat, kernel, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
    kernel.delete();
    //anchor.delete();
}