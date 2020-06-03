import TreeParser from "./tree-parser";

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
            this._createShapeTree(this._tree.getElementsByTagName("canvas")[0])
        } catch (e) {
            console.log(e);
        }
    }

    _createShapeTree(canvas) {
        let treeParser = new TreeParser(canvas);
        console.log(treeParser.shapeTree);


    }

}