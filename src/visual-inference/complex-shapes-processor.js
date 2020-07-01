import * as cv from "../../vendor/opencv.js";
import Shape from "./shape.js";

export default class ComplexShapesProcessor {

    constructor(mat) {
        this._mat = mat;
        this._circles = null;
    }

    _createCircles() {
        let cvCircles = new cv.Mat();
        cv.cvtColor(this._mat, this._mat, cv.COLOR_RGBA2GRAY, 0);
        cv.HoughCircles(this._mat, cvCircles, cv.HOUGH_GRADIENT, 1, 45, 75, 40, 0, 0);

        let circles = [];
        for (let i = 0; i < cvCircles.cols; ++i) {
            const x = cvCircles.data32F[i * 3], y = cvCircles.data32F[i * 3 + 1];
            const radius = cvCircles.data32F[i * 3 + 2];
            const center = new cv.Point(x, y);
            circles.push(new cv.Circle(center, radius));
        }
        cvCircles.delete();

        return circles;
    }

    get circles() {
        if (this._circles == null) {
            this._circles = this._createCircles();
        }
        return this._circles;
    }

    _drawContour(mat, contour) {
        let contours = new cv.MatVector();
        let color = new cv.Scalar(255, 255, 255, 255);
        contours.push_back(contour);
        cv.drawContours(mat, contours, 0, color, -1, cv.LINE_8);
        contours.delete();
    }

    _drawCircle(mat, circle) {
        let color = new cv.Scalar(0, 0, 0, 0);
        cv.circle(mat, circle.center, circle.radius + 2, color, cv.FILLED);
    }

    _isCircleInsideContour(contour, circle) {
        for (let iy = -1 * circle.radius; iy < circle.radius; iy++) {
            const dx = Math.floor(Math.sqrt(circle.radius * circle.radius - iy * iy));
            for (let ix = -1 * dx; ix < dx; ix++) {
                const cx = circle.center.x + ix;
                const cy = circle.center.y + iy;
                if (cv.pointPolygonTest(contour, new cv.Point(cx, cy), false) == 1) return true;
            }
        }
        return false;
    }

    process(shape) {
        let mask = cv.Mat.zeros(this._mat.rows, this._mat.cols, cv.CV_8U);
        this._drawContour(mask, shape.contour);

        for (let circle of this.circles) {
            if (this._isCircleInsideContour(shape.contour, circle)) {
                this._drawCircle(mask, circle);
            }
        }

        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        cv.findContours(mask, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

        cv.imshow("dst", mask);
    }
}

