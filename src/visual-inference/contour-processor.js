import * as cv from "../../vendor/opencv.js";
import Shape from "./shape.js";

export default class ContourProcessor {

    constructor(mat) {
        this.mat = mat;
    }

    process() {
        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();

        cv.findContours(this.mat, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

        this._contours = contours;
        this.hierarchy = hierarchy;
    }

    drawContours() {
        for (let i = 0; i < this._contours.size(); ++i) {
            let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
                Math.round(Math.random() * 255));
            cv.drawContours(this.mat, this._contours, i, color, 1, cv.LINE_8, this.hierarchy);
        }
    }

    constructHierarchyTree() {
        let tree = {}

        for (let i = 0; i < this._contours.size(); ++i) {
            let contourHierarchy = this.hierarchy.intPtr(0, i);
            let parent = contourHierarchy[3];
            if (parent == -1) {
                tree[i] = [];
            } else {
                this._searchForParentInSubtreeAndAppend(tree, i, parent);
            }
        }
        this.tree = tree;
    }

    get hierachyTree() {
        return this.tree;
    }

    get contours() { // should not be needed for future - use just extracted HierarchyTree
        return this._contours;
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

    generateShapeTree() {
        let shapes = []
        for (let i = 0; i < this._contours.size(); ++i) {
            let shape = new Shape(this._contours.get(i));
            shapes.push(shape.fullShapeEntry);
        }

        let shapeTree = [];
        this._translateContourIndicesToShapes(shapeTree, [this.tree], shapes);
        this._shapeTree = shapeTree[0];

        return this._shapeTree; // needs refactor
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
}