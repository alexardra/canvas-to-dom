import * as cv from "../../vendor/opencv.js";
import Shape from "./shape.js";
import HierarchyProcessor from "./hierarchy-processor.js";

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

        this._noise = [];
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

        let mask = cv.Mat.zeros(this._mat.rows, this._mat.cols, cv.CV_8U);
        let c = new cv.MatVector();
        c.push_back(contours.get(3));
        cv.drawContours(mask, c, 0, new cv.Scalar(255, 255, 255, 255), 1, cv.LINE_8);
        cv.imshow("test", mask)

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
            if (this._shapes[i].area < 30) { // noise
                this._noise.push(i);
                continue;
            }
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
        let hierarchyProcessor = new HierarchyProcessor(this.hierarchyTree);
        hierarchyProcessor.removeNoise(this._noise);
        hierarchyProcessor.addChildrenToShapesFromHierarchy(this._shapes);
        this._processComplexShapes(hierarchyProcessor);

        let shapeEntryInfos = Array(this._shapes.length).fill(null);
        for (let i = 0; i < this._shapes.length; i++) {
            if (this._noise.includes(i)) continue;
            if (i in this._duplicateContourIndicesMap) {
                this._shapes[i].color = this._colorExtractor.createColorFromShape(this._shapes[i]);
                shapeEntryInfos[i] = this._shapes[i].fullShapeEntry;
            }
        }

        let shapeTree = [];
        this._translateContourIndicesToShapes(shapeTree, [this.hierarchyTree], shapeEntryInfos, 0);
        shapeTree[0].identity = "canvas"; // should always be square - preprocessor ensures it

        return shapeTree[0];
    }

    _processComplexShapes(hierarchyProcessor) {
        const countShapes = this._shapes.length;
        for (let i = 0; i < countShapes; i++) {
            if (i in this._duplicateContourIndicesMap) {
                if (this._shapes[i].isComplex) {
                    if (this._shapes[i].children.length > 1) {
                        const isObsolete = this._complexShapesProcessor.isShapeObsolete(this._shapes[i]);
                        if (isObsolete) {
                            let entry = hierarchyProcessor.getHierarchyEntry(i);
                            hierarchyProcessor.replaceEntryWithChildren(entry);
                        }
                    } else if (this._shapes[i].children.length == 0) {
                        const generatedChildShapes = this._complexShapesProcessor.extractChildren(this._shapes[i]);
                        if (generatedChildShapes.length > 0) {
                            let entry = hierarchyProcessor.getHierarchyEntryContainingKey(i);
                            delete entry[i];
                            delete this._duplicateContourIndicesMap[i];
                            for (let generatedShape of generatedChildShapes) {
                                generatedShape.index = this._shapes.length;
                                this._shapes.push(generatedShape);
                                entry[generatedShape.index] = [];
                                this._duplicateContourIndicesMap[generatedShape.index] = [];
                            }
                        }
                    }
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

    get hierarchyTree() {
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
