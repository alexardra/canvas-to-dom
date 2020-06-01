import { TagPatterns } from "../supported-features"

export default class TagParser {

    constructor(tag) {
        this._fullShapeInfo = this._createFullShapeInfo(tag);
    }

    _createFullShapeInfo(tag) {
        tag = tag.substring(0, tag.indexOf(">"))
        let tokens = tag.split(" ");

        let fullShapeInfo = { identity: tokens[0] };
        const tagProperties = Object.keys(TagPatterns);
        tokens.slice(1).forEach(property => {
            let [key, value] = property.split("=");

            if (new RegExp(/(point-\d+)/).test(key)) key = "point";

            if (!tagProperties.includes(key)) {
                throw new Error(`Invalid property '${key}' in tag '<${tag}>'.`);
            }

            let isMatch = new RegExp(TagPatterns[key]).test(value);
            if (!isMatch) {
                throw new Error(`Invalid value ${value} in property 'key'`);
            }

            if (key == "point") {
                if (fullShapeInfo.hasOwnProperty("points")) {
                    fullShapeInfo.points.push(this._createParsedPropertyValue(key, value));
                } else {
                    fullShapeInfo.points = [this._createParsedPropertyValue(key, value)];
                }
            }

            fullShapeInfo[key] = this._createParsedPropertyValue(key, value);
        });
        return fullShapeInfo;
    }

    _createParsedPropertyValue(key, value) {
        if (["width", "height", "diameter", "z-order", "orientation", "color"].includes(key)) {
            return Number(value.substring(1, value.length - 1))
        } else if (key == "center" || key == "point") {
            const [cx, cy] = value.replace(/\s/g, "").substring(2, value.length - 2).split(',').map(Number);
            return { cx, cy };
        }
    }

    get fullShapeInfo() {
        return this._fullShapeInfo;
    }
}