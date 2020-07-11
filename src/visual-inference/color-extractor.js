import * as cv from "../../vendor/opencv.js";

export default class ColorExtractor {

    constructor(mat) {
        this._mat = mat;
    }

    _createChannelValuesFromMask(mask, shape) {
        let r = [], g = [], b = [], a = [];
        const { x, y, width, height } = cv.boundingRect(shape.approxPoly);
        for (let row = y; row < y + height; row++) {
            for (let col = x; col < x + width; col++) {
                if (cv.pointPolygonTest(shape.contour, new cv.Point(col, row), false) != 1) continue;
                const R = mask.data[row * mask.cols * mask.channels() + col * mask.channels()];
                if (R != 0) r.push(R);
                const G = mask.data[row * mask.cols * mask.channels() + col * mask.channels() + 1];
                if (G != 0) g.push(G)
                const B = mask.data[row * mask.cols * mask.channels() + col * mask.channels() + 2];
                if (B != 0) b.push(B);
                const A = mask.data[row * mask.cols * mask.channels() + col * mask.channels() + 3];
                if (A != 0) a.push(A);
            }
        }
        return [r, g, b, a];
    }


    _createAverageColor(values) {
        return values.length > 0 ? Math.round(values.reduce((a, b) => a + b) / values.length) : 0;
    }

    rgba2hex(rgba) {
        rgba.pop();
        return "#" + rgba.map(channel => (channel | 1 << 8).toString(16).slice(1)).join("");
    }

    createColorFromShape(shape) {
        let mask = cv.Mat.zeros(this._mat.cols, this._mat.rows, this._mat.type());
        let contours = new cv.MatVector();
        contours.push_back(shape.contour);
        cv.drawContours(mask, contours, 0, new cv.Scalar(255, 255, 255, 255), -1, cv.LINE_8);

        contours.delete();
        contours = new cv.MatVector();
        for (let child of shape.children) {
            contours.push_back(child.contour);
        }
        cv.drawContours(mask, contours, 0, new cv.Scalar(0, 0, 0, 0), -1, cv.LINE_8);
        contours.delete();

        cv.bitwise_and(this._mat, mask, mask);
        return this.rgba2hex(this._createChannelValuesFromMask(mask, shape).map(this._createAverageColor))
    }
}