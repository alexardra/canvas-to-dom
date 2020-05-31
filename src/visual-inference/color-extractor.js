import * as cv from "../../vendor/opencv.js";
import Shape from "./shape.js";

export default class ColorExtractor {

    constructor(mat) {
        this._mat = mat;
    }

    createColorFromShape(contour) {
        // let points = [];
        // for (let i = 0; i < contour.rows; i++) {
        //     points.push({ x: contour.data32S[i * 2], y: contour.data32S[i * 2 + 1] });
        // }

        // for (let point of points) {
        //     let R = this._mat.data[point.x * this._mat.cols * this._mat.channels() + point.y * this._mat.channels()];
        //     let G = this._mat.data[point.x * this._mat.cols * this._mat.channels() + point.y * this._mat.channels() + 1];
        //     let B = this._mat.data[point.x * this._mat.cols * this._mat.channels() + point.y * this._mat.channels() + 2];
        //     let A = this._mat.data[point.x * this._mat.cols * this._mat.channels() + point.y * this._mat.channels() + 3];
        //     console.log(R, G, B, A);
        // }
    }

}