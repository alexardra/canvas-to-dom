import TagParser from "./tag-parser";

export default class TreeParser {

    constructor(tree) {
        this._domTree = tree;
        this._tagsWithMissingProperties = {};
        this._shapeTree = this._createShapeTree();
    }

    _createShapeTree() {
        let shapeTree = {}
        this._createShapeTreeFromDom(this._domTree, shapeTree);
        shapeTree.identity = "canvas";
        return shapeTree;
    }


    _createShapeTreeFromDom(element, shapeTree) {
        let tagParser = new TagParser(element, shapeTree);

        for (let property in tagParser.fullShapeInfo) {
            shapeTree[property] = tagParser.fullShapeInfo[property];
        }

        if (tagParser.missingProperties.length > 0) {
            this._tagsWithMissingProperties[element] = tagParser.missingProperties;
        }

        if (element.childNodes && element.childNodes.length) {
            const nodes = Array.from(element.childNodes);
            nodes.forEach((node) => {
                shapeTree["children"].push({});
                this._createShapeTreeFromDom(node, shapeTree["children"][shapeTree["children"].length - 1]);
            });
        }
    }

    get tagsWithMissingProperties() {
        return this._tagsWithMissingProperties;
    }

    get shapeTree() {
        return this._shapeTree;
    }
}