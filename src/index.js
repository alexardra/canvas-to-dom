import * as cv from "../lib/opencv.js";

window.onload = () => {
  console.log("window loaded");
  cv["onRuntimeInitialized"] = () => {
    // do all your work here
    console.log("opencv loaded");

    canvasToDom("app")
  };
};


// nothing yet, will be added when neccessary
const sampleOptions = {};

const canvasToDom = (canvasEl, options) => {
    let src = cv.imread(canvasEl);
    console.log(src);
}