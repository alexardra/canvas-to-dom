// const cv = require('../vendor/opencv.js')
import * as cv from "../vendor/opencv.js";


cv["onRuntimeInitialized"] = () => {
    // do all your work here
    console.log("opencv loaded");

    // canvasToDom("app");
    // let domGenerator = new DomGenerator(infoInstance.canvas);
    // domGenerator.generate();

    // console.log(domGenerator.getDom());
};