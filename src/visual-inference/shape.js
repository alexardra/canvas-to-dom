import * as cv from "../../vendor/opencv.js";

export default class Shape {

    constructor(contour) {
        this._contour = contour;
        this._moments = cv.moments(this._contour, false);

        this._shape = null;
        this._vertices = [];

        this.computeShape();
        // this.generateFullShapeEntry();
    }

    get center() {
        // const cx = Math.round(((this._moments.m10 / this._moments.m00) + Number.EPSILON) * 100) / 100;
        // const cy = Math.round(((this._moments.m01 / this._moments.m00) + Number.EPSILON) * 100) / 100;
        const cx = this._moments.m10 / this._moments.m00;
        const cy = this._moments.m01 / this._moments.m00;
        return { cx, cy };
    }

    get area() {
        return this._moments.m00;
    }

    get perimeter() {
        // TODO: second parameter - closed curve
        return cv.arcLength(this._contour, true);
    }

    get orientation() {
        // TODO
    }

    get vertices() {
        return this._vertices;
    }

    get identity() {
        return this._shape;
    }

    get fullShapeEntry() {
        return this._entry;
    }

    computeShape() {
        const perimeter = this.perimeter;

        let approx = new cv.Mat();
        cv.approxPolyDP(this._contour, approx, 0.04 * perimeter, true);

        for (let i = 0; i < approx.data32S.length; i += 2) {
            this._vertices.push(approx.data32S.slice(i, i + 2));
        }

        if (this._vertices.length === 3) {
            this._shape = "triangle";
        } else if (this._vertices.length === 4) {
            const { x, y, width, height } = cv.boundingRect(approx);
            const aspectRatio = width / height;

            if (aspectRatio >= 0.95 && aspectRatio <= 1.05)
                this._shape = "square";
            else
                this._shape = "rectangle";
        } else if (this._vertices.length == 5) {
            this._shape = "pentagon";
        } else {
            // assume circle - TODO
            this._shape = "circle";
        }

        approx.delete();
    }

    generateFullShapeEntry() {
        this._entry = {};

        this._entry.identity = this.identity;
        this._entry.center = this.center;
        this._entry.children = [];
    }

    canApproxShape(shape) {
        let cxDelta = Math.abs(this.center.cx - shape.center.cx);
        let cyDelta = Math.abs(this.center.cy - shape.center.cy);
        let centersClose = cxDelta < 2 && cyDelta < 2;

        if (!centersClose) return false;
        let perimetersClose = Math.abs(this.perimeter - shape.perimeter) < 100;

        if (!perimetersClose) return false;

        let verticesClose = false;
        for (let i = 0; i < this.vertices.length; i++) {

            let verticeXDelta = Math.abs(this.vertices[i][0] - shape.vertices[i][0]);
            let verticeYDelta = Math.abs(this.vertices[i][1] - shape.vertices[i][1]);

            if (verticeXDelta < 70 && verticeYDelta < 70) verticesClose = true;

        }

        if (!verticesClose) return false;

        return true;
    }
}