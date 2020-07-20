import TagParser from "./tag-parser.js";

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
        if (tagParser.missingProperties.length > 0 && element.nodeName.toLowerCase() != "canvas") {
            this._tagsWithMissingProperties[element.outerHTML] = tagParser.missingProperties;
        }

        if (element.children && element.children.length) {
            const nodes = Array.from(element.children);
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