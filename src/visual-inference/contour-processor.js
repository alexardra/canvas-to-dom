import * as cv from "../../vendor/opencv.js";
import Shape from "./shape.js";

export default class ContourProcessor {

    constructor(mat) {
        this._mat = mat;

        this._tree = null;
        this._contours = null;
        this._hierarchy = null;
        this._shapes = null;
        this._shapeTree = null;

        this._process();
    }

    _process() {
        [this._contours, this._hierarchy] = this._createContours();
        this._shapes = this._createShapes();
        this._duplicateContourIndices = this._createDuplicateContourIndices();
    }

    _createContours() {
        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        cv.findContours(this._mat, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);
        return [contours, hierarchy];
    }

    _createShapes() {
        let shapes = [];
        for (let i = 0; i < this._contours.size(); i++) {
            shapes.push(new Shape(this._contours.get(i)));
        }
        return shapes;
    }

    _createDuplicateContourIndices() {
        let duplicateContourIndices = [];
        for (let i = 0; i < this._contours.size() - 1; i++) {
            for (let j = i + 1; j < this._contours.size(); j++) {
                let close = this._shapes[i].canApproxShape(this._shapes[j]);
                if (close && !duplicateContourIndices.includes(j)) {
                    duplicateContourIndices.push(j);
                }
            }
        }
        return duplicateContourIndices;
    }

    _createHierarchyTree() {
        let tree = {}
        for (let i = 0; i < this._contours.size(); ++i) {
            if (!this._duplicateContourIndices.includes(i)) {
                const parent = this._hierarchy.intPtr(0, i)[3];
                if (parent == -1) {
                    tree[i] = [];
                } else {
                    this._searchForParentInSubtreeAndAppend(tree, i, parent);
                }
            }
        }
        return tree;
    }

    _searchForParentInSubtreeAndAppend(tree, index, parent) {
        const siblings = Object.keys(tree).map(Number);

        if (siblings.includes(parent)) {
            const node = {}
            node[index] = [];
            tree[parent].push(node);
        } else {
            for (let i = 0; i < siblings.length; i++) {
                let children = tree[siblings[i]];
                for (let j = 0; j < children.length; j++) {
                    let subtree = tree[siblings[i]][j];
                    this._searchForParentInSubtreeAndAppend(subtree, index, parent);
                }
            }
        }
    }

    _createShapeTree() {
        let shapeEntryInfos = Array(this._shapes.length).fill(null);
        for (let i = 0; i < this._shapes.length; i++) {
            if (!this._duplicateContourIndices.includes(i)) {
                this._shapes[i].generateFullShapeEntry()
                shapeEntryInfos[i] = this._shapes[i].fullShapeEntry;
            }
        }
        let shapeTree = [];
        this._translateContourIndicesToShapes(shapeTree, [this.hierachyTree], shapeEntryInfos);
        return shapeTree[0];
    }

    _translateContourIndicesToShapes(shapeTree, hierarchies, shapes) {
        for (let entry of hierarchies) {
            let siblings = Object.keys(entry).map(Number);
            for (let sibling of siblings) {
                shapeTree.push(shapes[sibling]);
                this._translateContourIndicesToShapes(shapes[sibling].children, entry[sibling], shapes);
            }
        }
    }

    get hierachyTree() {
        if (this._tree == null) {
            this._tree = this._createHierarchyTree();
        }
        return this._tree;
    }

    get shapeTree() {
        if (this._shapeTree == null) {
            this._shapeTree = this._createShapeTree();
        }
        return this._shapeTree;
    }
}
