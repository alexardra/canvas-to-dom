import * as cv from "../../vendor/opencv.js";

export default class PreProcessor {

    constructor(mat) {
        this.mat = mat;
    }

    process() {
        // convert to greyscale
        cv.cvtColor(this.mat, this.mat, cv.COLOR_RGBA2GRAY, 0);

        // blur - reduce noise
        let ksize = new cv.Size(5, 5);
        // cv.GaussianBlur(mat, mat, ksize, 0, 0, cv.BORDER_DEFAULT);

        //threshold - binarization
        cv.adaptiveThreshold(this.mat, this.mat, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 5, 2);
    }
}