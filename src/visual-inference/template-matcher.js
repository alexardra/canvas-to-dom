import * as cv from "../../lib/opencv.js";

export default class TemplateMatcher {

    constructor(srcMat, templateMat) {
        this.src = srcMat;
        this.template = templateMat;
        this.matched = new cv.Mat();
        this.process();
    }

    process() {
        let matched = new cv.Mat();
        let mask = new cv.Mat();
        cv.matchTemplate(this.src, this.template, matched, cv.TM_CCOEFF, mask);
        this.locations = cv.minMaxLoc(matched, mask);
        // matched.delete(); mask.delete();
    }

    // for testing
    drawRectangle(outputCanvas) {
        let color = new cv.Scalar(255, 0, 0, 255);
        let point = new cv.Point(this.maxLoc.x + this.template.cols, this.maxLoc.y + this.template.rows);

        let dst = new cv.Mat();
        cv.cvtColor(this.src, dst, cv.COLOR_GRAY2RGBA, 0);
        cv.rectangle(dst, this.maxLoc, point, color, 2, cv.LINE_8, 0);
        cv.imshow(outputCanvas, dst);
    }

    get minVal() {
        return this.locations.minVal;
    }

    get maxVal() {
        return this.locations.maxVal;
    }

    get minLoc() {
        return this.locations.minLoc;
    }

    get maxLoc() {
        return this.locations.maxLoc;
    }
}