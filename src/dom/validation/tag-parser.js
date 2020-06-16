import { TagPatterns } from "../supported-features"

export default class TagParser {

    constructor(element, shapeTree) {
        this._fullShapeInfo = this._createFullShapeInfo(element, shapeTree);
    }

    _createFullShapeInfo(element) {
        let shapeTree = {};
        shapeTree.identity = element.nodeName.toLowerCase();
        const tagProperties = Object.keys(TagPatterns);

        if (element.attributes && element.attributes.length) {
            const attributes = Array.from(element.attributes);

            attributes.forEach((attribute) => {
                const key = attribute.nodeName;
                const value = attribute.nodeValue;

                if (new RegExp(/(point-\d+)/).test(key)) key = "point";

                if (!tagProperties.includes(key)) {
                    throw new Error(`Invalid property '${key}' in tag '<${tag}>'.`);
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
}