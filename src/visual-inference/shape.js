import * as cv from "../../vendor/opencv.js";

export default class Shape {

    constructor(contour) {
        this._contour = contour;

        this._moments = null;
        this._approxPoly = null;
        this._shape = null;
        this._fullShapeInfo = null;
        this._vertices = null;

        this._process();
    }

    _process() {
        this._moments = this._createMoments();
        this._approxPoly = this._createApproxPoly();
        this._vertices = this._createVertices();
        this._shape = this._createShape();

        this._approxPoly.delete();
    }

    _createMoments() {
        return cv.moments(this._contour, false);
    }

    _createApproxPoly() {
        const perimeter = this.perimeter;
        let approx = new cv.Mat();
        cv.approxPolyDP(this._contour, approx, 0.04 * perimeter, true);
        return approx;
    }

    _createVertices() {
        let vertices = []
        for (let i = 0; i < this._approxPoly.data32S.length; i += 2) {
            vertices.push(this._approxPoly.data32S.slice(i, i + 2));
        }
        return vertices;
    }

    _createShape() {
        let shape = null;
        if (this._vertices.length === 3) {
            shape = "triangle";
        } else if (this._vertices.length === 4) {
            const { x, y, width, height } = cv.boundingRect(this._approxPoly);
            const aspectRatio = width / height;

            if (aspectRatio >= 0.95 && aspectRatio <= 1.05)
                shape = "square";
            else
                shape = "rectangle";
        } else if (this._vertices.length == 5) {
            shape = "pentagon";
        } else {
            // assume circle - TODO
            shape = "circle";
        }
        return shape;
    }

    get center() {
        const cx = Math.round(((this._moments.m10 / this._moments.m00) + Number.EPSILON) * 100) / 100;
        const cy = Math.round(((this._moments.m01 / this._moments.m00) + Number.EPSILON) * 100) / 100;
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
        if (this._fullShapeInfo == null) {
            this._fullShapeInfo = this._createFullShapeEntry();
        }
        return this._fullShapeInfo;
    }

    _createFullShapeEntry() {
        let fullShapeInfo = {};
        fullShapeInfo.identity = this.identity;
        fullShapeInfo.center = this.center;
        fullShapeInfo.children = [];

        return fullShapeInfo;
    }

    canApproxShape(shape) {
        if (this.identity != shape.identity) return false;

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