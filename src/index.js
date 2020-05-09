import * as cv from "../lib/opencv.js";
import PreProcessor from "./visual-inference/preprocessor";
import TemplateProcessor from "./visual-inference/template-processor";
import TemplateMatcher from "./visual-inference/template-matcher";
import { adjustColorSpace } from "./color-space";
import Shape from "./shape";
import DomGenerator from "./dom-generator";
import * as infoInstance from "../tests/simple-info-hierarchy.json";


window.onload = () => {
  console.log("window loaded");
  cv["onRuntimeInitialized"] = () => {
    // do all your work here
    console.log("opencv loaded");

    canvasToDom("app");
    let domGenerator = new DomGenerator(infoInstance.canvas);
    domGenerator.generate();

    console.log(domGenerator.getDom());
  };
};

// nothing yet, will be added when neccessary
const sampleOptions = {
  colorSpace: "YCbCr"
};

const canvasToDom = (canvasEl, options = sampleOptions) => {
  let src = cv.imread(canvasEl);

  const srcPreProcessor = new PreProcessor(src);
  srcPreProcessor.process();

  const testTemplateProcessor = new TemplateProcessor(src); // TODO

  cv.imshow('boundaries', src);

  // erode_boundaries(src);
  // cv.imshow('erode', src);

  let { contours, hierarchy } = getContourInfo(src);
  printShapes(contours);

  let dst = cv.Mat.zeros(src.cols, src.rows, cv.CV_8UC3);
  drawContours(dst, contours, hierarchy);
  cv.imshow('dst', dst);
  // src.delete(); dst.delete(); contours.delete(); hierarchy.delete();
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


const getContourInfo = (mat) => {
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();

  cv.findContours(mat, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

  return { contours, hierarchy };
}

const drawContours = (mat, contours, hierarchy) => {
  for (let i = 0; i < contours.size(); ++i) {
    let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
      Math.round(Math.random() * 255));
    cv.drawContours(mat, contours, i, color, 1, cv.LINE_8, hierarchy);
  }
}

const printShapes = (contours) => {
  for (let i = 0; i < contours.size(); ++i) {
    console.log(new Shape(contours.get(i)).getShape());
  }
} 

