import * as cv from "../lib/opencv.js";
import { adjustColorSpace } from "./color-space";

window.onload = () => {
  console.log("window loaded");
  cv["onRuntimeInitialized"] = () => {
    // do all your work here
    console.log("opencv loaded");

    // canvasToDom("app")
  };
  canvasToDom("app");
};


// nothing yet, will be added when neccessary
const sampleOptions = {
  colorSpace: "YCbCr"
};



const canvasToDom = (canvasEl, options = sampleOptions) => {
  let src = cv.imread(canvasEl);
  let dst = new cv.Mat();
  console.log(adjustColorSpace(src, dst, options.colorSpace));

  // src.delete();
  // dst.delete();
  cv.imshow('dst', dst);
}