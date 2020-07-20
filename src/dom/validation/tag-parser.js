import { TagPropertyMap, TagPatterns } from "../supported-features.js"

export default class TagParser {

    constructor(element, shapeTree) {
        this._missingProperties = [];
        this._fullShapeInfo = this._createFullShapeInfo(element, shapeTree);
    }

    _createFullShapeInfo(element) {
        let shapeTree = {};
        shapeTree.identity = element.nodeName.toLowerCase();
        const tagProperties = TagPropertyMap[shapeTree.identity];

        const attributes = Array.from(element.attributes).map(attribute => attribute.nodeName);
        this._missingProperties = tagProperties.filter(property => !attributes.includes(property));
        if (element.attributes && element.attributes.length) {
            Array.from(element.attributes).forEach((attribute) => {
                let key = attribute.nodeName;
                let value = attribute.nodeValue;

                if (!tagProperties.includes(key)) {
                    throw new Error(`Invalid property '${key}' in tag '<${shapeTree.identity}>'.`);
                }
                let isMatch = new RegExp(TagPatterns[key]).test(value);
                if (!isMatch) {
                    throw new Error(`Invalid value ${value} in property ${key}`);
                }

                if (key == "point") {
                    if (shapeTree.hasOwnProperty("points")) {
                        shapeTree.points.push(this._createParsedPropertyValue(key, value));
                    } else {
                        shapeTree.points = [this._createParsedPropertyValue(key, value)];
                    }
                } else {
                    shapeTree[key] = this._createParsedPropertyValue(key, value);
                }
            });
        }

        shapeTree.children = [];
        return shapeTree;
    }

    _createParsedPropertyValue(key, value) {
        if (["width", "height", "diameter", "z-order", "orientation", "color"].includes(key)) {
            return value;
        } else if (key == "center" || key == "point") {
            const [cx, cy] = value.replace(/\s/g, "").substring(1, value.length - 1).split(',').map(Number);
            return { cx, cy };
        }
    }

    get fullShapeInfo() {
        return this._fullShapeInfo;
    }

    get missingProperties() {
        return this._missingProperties;
    }
}