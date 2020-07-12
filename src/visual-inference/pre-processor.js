import * as cv from "../../vendor/opencv.js";

export default class PreProcessor {

    constructor(mat) {
        this._mat = mat;
    }

    binarize() {
        // convert from rgba to rgb
        cv.cvtColor(this._mat, this._mat, cv.COLOR_RGBA2RGB, 0);

        // blur
        let blurred = new cv.Mat();
        cv.blur(this._mat, blurred, new cv.Size(3, 3), new cv.Point(-1, -1), cv.BORDER_DEFAULT);

        // detect edges with canny 
        let cthresh = 75;
        let cannyMat = new cv.Mat();
        cv.Canny(blurred, cannyMat, cthresh, cthresh * 2, 3, 0);

        // make border edge
        cv.copyMakeBorder(cannyMat, cannyMat, 1, 1, 1, 1, cv.BORDER_CONSTANT, new cv.Scalar(255, 255, 255, 255));

        this._erode_boundaries(cannyMat);
        return cannyMat;
    }

    _erode_boundaries(mat) {
        let anchor = new cv.Point(-1, -1);
        let erosionSize = new cv.Size(3, 3);
        let borderValue = cv.Scalar.all(Number.MAX_VALUE);

        let structuringElement = cv.getStructuringElement(cv.MORPH_RECT, erosionSize);
        cv.dilate(mat, mat, structuringElement, anchor, 1, cv.BORDER_CONSTANT, borderValue);
        cv.erode(mat, mat, structuringElement, anchor, 1, cv.BORDER_CONSTANT, borderValue);
    }
}