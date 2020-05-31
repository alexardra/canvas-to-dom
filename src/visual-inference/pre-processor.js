import * as cv from "../../vendor/opencv.js";

export default class PreProcessor {

    constructor(mat) {
        this._mat = mat;

        this._process()
    }

    _process() {
        // convert to greyscale
        cv.cvtColor(this._mat, this._mat, cv.COLOR_RGBA2GRAY, 0);
        // blur - reduce noise
        let ksize = new cv.Size(5, 5);
        cv.GaussianBlur(this._mat, this._mat, ksize, 0, 0, cv.BORDER_DEFAULT);

        //threshold - binarization
        cv.adaptiveThreshold(this._mat, this._mat, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 5, 2);
    }
}