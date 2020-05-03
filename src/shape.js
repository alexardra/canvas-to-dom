import * as cv from "../lib/opencv.js";

export default class Shape {

    constructor(contour) {
        this.contour = contour;
        this.moments = cv.moments(this.contour, false);

        this.shape = null;
        this.vertices = [];

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

    getVertices() {
        return this.vertices;
    }

    computeShape() {
        const perimeter = this.getPerimeter();

        let approx = new cv.Mat();
        cv.approxPolyDP(this.contour, approx, 0.04 * perimeter, true);

        for (let i = 0; i < approx.data32S.length; i += 2) {
            this.vertices.push(approx.data32S.slice(i, i + 2));
        }

        if (this.vertices.length === 3) {
            this.shape = "triangle";
        } else if (this.vertices.length === 4) {
            const { x, y, width, height } = cv.boundingRect(approx);
            const aspectRatio = width / height;

            if (aspectRatio >= 0.95 && aspectRatio <= 1.05)
                this.shape = "square";
            else
                this.shape = "rectangle";
        } else if (this.vertices.length == 5) {
            this.shape = "pentagon";
        } else {
            // assume circle - TODO
            this.shape = "circle";
        }

        approx.delete();
    }

    getShape() {
        return this.shape;
    }
}