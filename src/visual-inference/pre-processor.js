import * as cv from "../../vendor/opencv.js";

export default class PreProcessor {

    constructor(mat) {
        this._mat = mat;
    }

    binarize() {
        // convert to greyscale
        cv.cvtColor(this._mat, this._mat, cv.COLOR_RGBA2GRAY, 0);
        // blur - reduce noise
        let ksize = new cv.Size(5, 5);
        cv.GaussianBlur(this._mat, this._mat, ksize, 0, 0, cv.BORDER_DEFAULT);

        //threshold - binarization
        cv.adaptiveThreshold(this._mat, this._mat, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 5, 2);
    }

    _erode_boundaries() { // TODO
        let kernel = cv.Mat.ones(2, 2, cv.CV_8U);
        let anchor = new cv.Point(-1, -1);

        cv.erode(this._mat, this._mat, kernel, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
        kernel.delete();
        anchor.delete();
    }

}