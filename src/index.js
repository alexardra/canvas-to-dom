import * as cv from "../lib/opencv.js";
import { adjustColorSpace } from "./color-space";
import Shape from "./shape";

window.onload = () => {
  console.log("window loaded");
  cv["onRuntimeInitialized"] = () => {
    // do all your work here
    console.log("opencv loaded");

    canvasToDom("app");
  };
};


// nothing yet, will be added when neccessary
const sampleOptions = {
  colorSpace: "YCbCr"
};


const canvasToDom = (canvasEl, options = sampleOptions) => {
  let src = cv.imread(canvasEl);

  preProcess(src);
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

const preProcess = (mat) => {
  // convert to greyscale
  cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0);

  // blur - reduce noise
  let ksize = new cv.Size(5, 5);
  // cv.GaussianBlur(mat, mat, ksize, 0, 0, cv.BORDER_DEFAULT);

  //threshold - binarization
  cv.adaptiveThreshold(mat, mat, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 5, 2);
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