import * as cv from "../../vendor/opencv.js";
import Shape from "./shape.js";

export default class ContourProcessor {

    constructor(mat, colorExtractor, complexShapesProcessor) {
        this._mat = mat;
        this._colorExtractor = colorExtractor;
        this._complexShapesProcessor = complexShapesProcessor;

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
        this._duplicateContourIndicesMap = this._createDuplicateContourIndicesMap();
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


    _createDuplicateContourIndicesMap() {
        let duplicateContourIndicesMap = {};
        let duplicateContourIndices = [];
        for (let i = 0; i < this._contours.size() - 1; i++) {
            for (let j = i + 1; j < this._contours.size(); j++) {
                if (this._shapes[i].canApproxShape(this._shapes[j]) && !duplicateContourIndices.includes(j)) {
                    if (i in duplicateContourIndicesMap) {
                        duplicateContourIndicesMap[i].push(j);
                    } else {
                        duplicateContourIndicesMap[i] = [j];
                    }
                    duplicateContourIndices.push(j);
                }
            }
        }
        const indices = Array.from(Array(this._contours.size()).keys());
        const uniqueIndices = indices.filter(i => !duplicateContourIndices.includes(i));
        for (let i of uniqueIndices) {
            if (!(i in duplicateContourIndicesMap))
                duplicateContourIndicesMap[i] = [];
        }
        return duplicateContourIndicesMap;
    }

    _createHierarchyTree() {
        let tree = {}
        for (let i = 0; i < this._contours.size(); ++i) {
            if (i in this._duplicateContourIndicesMap) {
                let parent = this._hierarchy.intPtr(0, i)[3];
                if (parent == -1) {
                    tree[i] = [];
                } else {
                    if (!(parent in this._duplicateContourIndicesMap)) {
                        for (const uniqueIndex in this._duplicateContourIndicesMap) {
                            if (this._duplicateContourIndicesMap[uniqueIndex].includes(parent)) {
                                parent = Number(uniqueIndex);
                                break;
                            }
                        }
                    }
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
        this._generateChildrenForShapesFromHierarchy([this.hierachyTree], 0);
        this._processComplexShapes();

        let shapeEntryInfos = Array(this._shapes.length).fill(null);
        for (let i = 0; i < this._shapes.length; i++) {
            if (i in this._duplicateContourIndicesMap) {
                this._shapes[i].color = this._colorExtractor.createColorFromShape(this._shapes[i].contour);
                shapeEntryInfos[i] = this._shapes[i].fullShapeEntry;
            }
        }

        let shapeTree = [];
        this._translateContourIndicesToShapes(shapeTree, [this.hierachyTree], shapeEntryInfos, 0);
        shapeTree[0].identity = "canvas"; // TODO: should always be square - ensure with bounding box


        return shapeTree[0];
    }

    _processComplexShapes() {
        const countShapes = this._shapes.length;
        for (let i = 0; i < countShapes; i++) {
            if (i in this._duplicateContourIndicesMap) {
                // if shape is complex - process shape 
                if (this._shapes[i].isComplex) {

                    const hasShapeChildren = Object.keys(this._shapes[i].children).length > 0;

                    if (hasShapeChildren) {
                        const isObsolete = this._complexShapesProcessor.isShapeObsolete(this._shapes[i]);
                        if (isObsolete) {
                            // remove shape from hierarchy 
                        }
                    } else {
                        const generatedChildShapes = this._complexShapesProcessor.extractChildren(this._shapes[i]);
                        if (generatedChildShapes.length > 0) {
                            let entry = [];
                            this._getHierarchyEntryContainingIndex([this.hierachyTree], i, entry);

                            if (entry == null || !(i in entry[0])) {
                                throw new Error("Some problem with hierarchy, shape with given index should be contained");
                            } else {
                                delete entry[0][i];
                                delete this._duplicateContourIndicesMap[i];
                                for (let generatedShape of generatedChildShapes) {
                                    generatedShape.index = this._shapes.length;
                                    this._shapes.push(generatedShape);
                                    entry[0][generatedShape.index] = [];
                                    this._duplicateContourIndicesMap[generatedShape.index] = [];
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    _getHierarchyEntryContainingIndex(hierarchies, index, resultEntry) {
        if (resultEntry.length != 0) return;

        for (let entry of hierarchies) {
            let siblings = Object.keys(entry).map(Number);
            for (let sibling of siblings) {
                if (sibling == index) {
                    resultEntry.push(entry);
                } else {
                    this._getHierarchyEntryContainingIndex(entry[sibling], index, resultEntry);
                }
            }
        }
    }

    _translateContourIndicesToShapes(shapeTree, hierarchies, shapes, depth) {
        for (let entry of hierarchies) {
            let siblings = Object.keys(entry).map(Number);
            for (let sibling of siblings) {
                shapes[sibling].zOrder = depth;
                shapeTree.push(shapes[sibling]);
                this._shapes[sibling].children = entry[sibling].map(e => Object.keys(e)).map(x => Number(x[0]));
                this._translateContourIndicesToShapes(shapes[sibling].children, entry[sibling], shapes, depth + 1);
            }
        }
    }

    _generateChildrenForShapesFromHierarchy(hierarchies, depth) {
        for (let entry of hierarchies) {
            let siblings = Object.keys(entry).map(Number);
            for (let sibling of siblings) {
                this._shapes[sibling].children = entry[sibling].map(e => Object.keys(e)).map(x => {
                    const index = Number(x[0]);
                    return { index: this._shapes[index] };
                });
                this._generateChildrenForShapesFromHierarchy(entry[sibling], depth + 1);
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

    get shapes() { // TEMP for testing
        return this._shapes;
    }
}
