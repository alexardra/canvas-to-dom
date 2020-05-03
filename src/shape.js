import * as cv from "../lib/opencv.js";

export default class Shape {

    constructor(contour) {
        this.contour = contour;
        this.moments = cv.moments(this.contour, false);
        this.computeShape();
    }

    getCenter() {
        const cx = this.moments.m10 / this.moments.m00;
        const cy = this.moments.m01 / this.moments.m00;
        return { cx, cy };
    }

    getArea() {
        return this.moments.m00;
    }

    getPerimeter() {
        // TODO: second parameter - closed curve
        return cv.arcLength(this.contour, true);
    }

    getOrientation() {
        // TODO
    }

    computeShape() {
        const perimeter = this.getPerimeter();
        let shape = null;

        let approx = new cv.Mat();
        cv.approxPolyDP(this.contour, approx, 0.04 * perimeter, true);

        const verticeCoordinates = approx.data32S;

        if (verticeCoordinates.length / 2 === 4) {
            const { x, y, width, height } = cv.boundingRect(approx);
            const aspectRatio = width / height;

            if (aspectRatio >= 0.95 && aspectRatio <= 1.05)
                shape = "square";
            else
                shape = "rectangle";
        }

        approx.delete();
        this.shape = shape;
    }

    getShape() {
        return this.shape;
    }
}