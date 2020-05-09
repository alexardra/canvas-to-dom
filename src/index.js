import * as cv from "../lib/opencv.js";
import PreProcessor from "./visual-inference/preprocessor";
import TemplateProcessor from "./visual-inference/template-processor";
import TemplateMatcher from "./visual-inference/template-matcher";

window.onload = () => {
  console.log("window loaded");
  cv["onRuntimeInitialized"] = () => {
    // do all your work here
    console.log("opencv loaded");

    canvasToDom("app")
  }
}

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

  let { contours, hierarchy } = getContourInfo(src);

  let dst = cv.Mat.zeros(src.cols, src.rows, cv.CV_8UC3);
  drawContours(dst, contours, hierarchy);

  cv.imshow('dst', dst);
  // src.delete(); dst.delete(); contours.delete(); hierarchy.delete();
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
