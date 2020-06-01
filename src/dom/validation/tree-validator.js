import { Tags } from "../supported-features"
import TagParser from "./tag-parser";

export default class TreeValidator {

    constructor(tree) {
        this._tree = tree;
    }

    /*
     * HTML -> string
     * string -> JSON (shapeTree) 
     */

    checkValidity() {
        try {
            let inner = this._tree.getElementsByTagName("canvas")[0].innerHTML;
            this._createShapeTree(`<canvas>${inner}</canvas>`);

        } catch (e) {
            console.log(e);
        }
    }

    _createShapeTree(canvas) {

        // console.log(canvas);

        const tagIndices = Array.from(Tags.map(tag => canvas.indexOf(tag))).filter(index => index != -1);
        const nextTagIndex = Math.min.apply(Math, tagIndices);

        canvas = canvas.substring(nextTagIndex);
        let tagParser = new TagParser(canvas);
    }

}