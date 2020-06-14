import * as cv from "../../vendor/opencv.js";

export default class Shape {

    constructor(contour) {
        this._contour = contour;

        this._moments = null;
        this._approxPoly = null;
        this._shape = null;
        this._fullShapeInfo = null;
        this._vertices = null;
        this._rotatedRect = null;
        this._zOrder = null;

        this._process();
    }

    _process() {
        this._moments = this._createMoments();
        this._approxPoly = this._createApproxPoly();
        this._rotatedRect = this._createRotatedRect();
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

    _createRotatedRect() {
        return cv.minAreaRect(this._contour);
    }

    _createShape() {
        let shape = null;

        if (this._vertices.length == 2) {
            shape = "line";
        } else if (this._vertices.length === 3) {
            shape = "triangle";
        } else if (this._vertices.length === 4) {
            let cxDelta = Math.abs(this.center.cx - this._rotatedRect.center.x);
            let cyDelta = Math.abs(this.center.cy - this._rotatedRect.center.y);
            let centersClose = cxDelta < 2 && cyDelta < 2;

            if (centersClose) {
                const { x, y, width, height } = cv.boundingRect(this._approxPoly);
                const aspectRatio = width / height;
                shape = (aspectRatio >= 0.95 && aspectRatio <= 1.05) ? "square" : "rectangle";
                this._width = width, this._height = height;
            } else {
                shape = "polygon";
            }
        } else if (this._vertices.length == 5) {
            shape = "pentagon";
        } else {
            if (cv.isContourConvex(this._approxPoly)) {
                shape = "circle";

                let circle = cv.minEnclosingCircle(this._contour); // TODO: make more precise
                this._diameter = 2 * Math.round(Math.sqrt(this.area / Math.PI));
            } else {
                shape = "polygon";
            }
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
        if (this._rotatedRect == null) {
            this._createRotatedRect();
        }

        if (this._shape == "circle") {
            return 0;
        }

        let angle = this._rotatedRect.angle;
        if (this._rotatedRect.size.width < this._rotatedRect.size.height) {
            angle = angle + 180;
        } else {
            angle = angle + 90;
        }
        return Math.round((angle + Number.EPSILON) * 100) / 100;
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

    get color() {
        return this._color;
    }

    set zOrder(zOrder) {
        this._zOrder = zOrder;
    }

    set color(color) {
        this._color = color;
    }

    get size() {
        if (this.identity == "square" || this.identity == "rectangle") {
            return {
                width: this._width,
                height: this._height
            }
        } else if (this.identity == "circle") {
            return this._diameter;
        }
    }

    _createFullShapeEntry() {
        let fullShapeInfo = {};
        fullShapeInfo.identity = this.identity;
        fullShapeInfo.center = this.center;
        fullShapeInfo.orientation = this.orientation;

        if (fullShapeInfo.identity == "polygon" || fullShapeInfo.identity == "triangle" || fullShapeInfo.identity == "line") {
            fullShapeInfo.points = Array.from(this._vertices, (vertice) => ({ cx: vertice[0], cy: vertice[1] }));
        } else if (fullShapeInfo.identity == "square" || fullShapeInfo.identity == "rectangle") {
            const size = this.size;
            fullShapeInfo.width = size.width, fullShapeInfo.height = size.height;
        } else if (fullShapeInfo.identity == "circle") {
            fullShapeInfo.diameter = this.size;
        }

        fullShapeInfo.color = this.color;
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