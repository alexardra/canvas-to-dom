import * as cv from "../../vendor/opencv.js";
import PreProcessor from "../visual-inference/preprocessor";
import TemplateProcessor from "../visual-inference/template-processor";
import TemplateMatcher from "../visual-inference/template-matcher";
import Shape from "../visual-inference/shape";
import DomGenerator from "../dom-generation/dom-generator";

import * as infoInstance from "../../tests/simple-info-hierarchy.json";
import ContourProcessor from "../visual-inference/contour-processor.js";

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
    // let domGenerator = new DomGenerator(infoInstance.canvas);
    // domGenerator.generate();

    // console.log(domGenerator.getDom());
})();



// // nothing yet, will be added when neccessary
const sampleOptions = {
    colorSpace: "YCbCr"
};

const canvasToDom = async (canvasEl, options = sampleOptions) => {
    let src = cv.imread(canvasEl);

    const srcPreProcessor = new PreProcessor(src);

    // const testTemplateProcessor = new TemplateProcessor(src);
    // await testTemplateProcessor.process()
    // testTemplateProcessor.removeTemplates()

    // erode_boundaries(src);
    // cv.imshow('erode', src);

    const testContourProcessor = new ContourProcessor(src);
    console.log(testContourProcessor.hierachyTree);
    console.log(testContourProcessor.shapeTree);

    // let domGenerator = new DomGenerator([tree]);
    // domGenerator.generate();
    // // console.log(domGenerator.getDom())

    // var doc = new DOMParser().parseFromString(domGenerator.getDom(), "text/html");
    // console.log(doc);

    cv.imshow('dst', src);
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

