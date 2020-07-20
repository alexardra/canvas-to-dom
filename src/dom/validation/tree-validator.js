import TreeParser from "./tree-parser.js";

export default class TreeValidator {

    constructor(tree) {
        this._tree = tree;

        this._treeParser = null;
        this._shapeTree = null;
        this._isValid = null;
        this._invalidError = null;
    }

    get isValid() {
        if (this._isValid == null) {

            if (this._shapeTree != null) {
                this._isValid = true;
            } else {
                try {
                    this._shapeTree = this._createShapeTree(this._tree.getElementsByTagName("canvas")[0]);
                    this._isValid = true;
                } catch (e) {
                    this._invalidError = e;
                    this._isValid = false;
                }
            }
        }
        return this._isValid;
    }

    get shapeTree() {
        return this._shapeTree;
    }

    get error() {
        return this._invalidError;
    }

    get containsAllProperties() {
        return this.isValid ? Object.keys(this._treeParser.tagsWithMissingProperties).length === 0 : false;
    }

    get tagsWithMissingProperties() {
        if (this._treeParser == null) {
            this.isValid; // TODO: refactor
        }
        return this._treeParser.tagsWithMissingProperties;
    }

    _createShapeTree(canvas) {
        this._treeParser = new TreeParser(canvas);
        return this._treeParser.shapeTree;
    }
}