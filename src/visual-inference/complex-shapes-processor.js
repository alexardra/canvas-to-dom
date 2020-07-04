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

    _drawContour(mat, contour, color) {
        let contours = new cv.MatVector();
        contours.push_back(contour);
        cv.drawContours(mat, contours, 0, color, 1, cv.LINE_8);
        contours.delete();
    }


    _clearCircle(mat, circle) {
        let color = new cv.Scalar(0, 0, 0, 0);
        cv.circle(mat, circle.center, circle.radius + 2, color, cv.FILLED);
    }

    _drawCircle(mat, circle) {
        let color = new cv.Scalar(255, 255, 255, 255);
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

    _createShapeFromCircle(circle) {
        let mask = cv.Mat.zeros(this._mat.rows, this._mat.cols, cv.CV_8U);
        this._drawCircle(mask, circle);

        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        cv.findContours(mask, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

        return new Shape(contours.get(0));
    }

    isShapeObsolete(shape) { // TODO - implement
        let white = new cv.Scalar(255, 255, 255, 255);
        let black = new cv.Scalar(0, 0, 0, 0);

        let mask = cv.Mat.zeros(this._mat.rows, this._mat.cols, cv.CV_8U);  //black
        cv.rectangle(mask, new cv.Point(0, 0), new cv.Point(mask.rows, mask.cols), white, cv.FILLED, cv.LINE_8, 0);
        for (let childShape of shape.children) {
            this._drawContour(mask, childShape.contour, black);
        }

        let original = cv.Mat.zeros(this._mat.rows, this._mat.cols, cv.CV_8U);

        this._drawContour(original, shape.contour, white);

        cv.bitwise_and(original, mask, original);

        // cv.imshow("dst", original);

        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        cv.findContours(original, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

        let out = cv.Mat.zeros(this._mat.rows, this._mat.cols, cv.CV_8U);
        this._drawContour(out, contours.get(0), white);

        let result = cv.matchShapes(shape.contour, contours.get(0), 1, 0);
        cv.imshow("dst", out);

        return result == 0;
    }


    extractChildren(shape) {
        let extractedShapes = [];
        let mask = cv.Mat.zeros(this._mat.rows, this._mat.cols, cv.CV_8U);
        this._drawContour(mask, shape.contour, new cv.Scalar(255, 255, 255, 255));

        for (let circle of this.circles) {
            if (this._isCircleInsideContour(shape.contour, circle)) {
                this._clearCircle(mask, circle);
                extractedShapes.push(this._createShapeFromCircle(circle));
            }
        }

        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        cv.findContours(mask, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

        // should contain just one contour - TODO: check
        let restOfParentShape = new Shape(contours.get(0));
        extractedShapes.push(restOfParentShape);

        return extractedShapes;
    }
}

