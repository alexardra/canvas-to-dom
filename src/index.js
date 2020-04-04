import * as cv from "../lib/opencv.js";

window.onload = () => {
  console.log("window loaded");
  cv["onRuntimeInitialized"] = () => {
    // do all your work here
    console.log("opencv loaded");
  };
};
