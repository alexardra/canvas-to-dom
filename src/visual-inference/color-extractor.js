import * as cv from "../../vendor/opencv.js";

export default class ColorExtractor {

    constructor(mat) {
        this._mat = mat;
    }

    _createChannelValuesFromMask(mask) {
        let r = [], g = [], b = [], a = [];

        for (let row = 0; row < mask.rows; row++) {
            for (let col = 0; col < mask.cols; col++) {
                const R = mask.data[row * mask.cols * mask.channels() + col * mask.channels()];
                if (R != 0) r.push(R);
                const G = mask.data[row * mask.cols * mask.channels() + col * mask.channels() + 1];
                if (G != 0) g.push(G);
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
        return "#" + rgba.map(channel => (channel | 1 << 8).toString(16).slice(1)).join("");
    }

    createColorFromShape(contour) { // TODO: cleanup
        let mask = cv.Mat.zeros(this._mat.cols, this._mat.rows, this._mat.type());
        let color = new cv.Scalar(255, 255, 255, 255);

        let contours = new cv.MatVector();
        contours.push_back(contour);
        cv.drawContours(mask, contours, 0, color, -1, cv.LINE_8);

        cv.bitwise_and(this._mat, mask, mask);

        return this.rgba2hex(this._createChannelValuesFromMask(mask).map(this._createAverageColor));
    }
}