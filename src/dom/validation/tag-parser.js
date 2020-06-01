import { TagPatterns } from "../supported-features"

export default class TagParser {

    constructor(tag) {
        this._createFullShapeInfo(tag);
    }

    _createFullShapeInfo(tag) {
        tag = tag.substring(0, tag.indexOf(">"))
        console.log(tag);
        let tokens = tag.split(" ");

        let fullShapeInfo = { identity: tokens[0] };
        let tagProperties = Object.keys(TagPatterns);
        tokens.slice(1).forEach(property => {
            let [key, value] = property.split("=");

            if (!tagProperties.includes(key)) { // TODO: points
                throw new Error(`Invalid property '${key}' in tag '<${tag}>'.`);
            }

            let isMatch = new RegExp(TagPatterns[key]).test(value);
            if (!isMatch) {
                throw new Error(`Invalid value ${value} in property 'key'`);
            }
            fullShapeInfo[key] = this._createParsedPropertyValue(key, value);;
        });
        console.log(fullShapeInfo);
    }

    _createParsedPropertyValue(key, value) {
        if (key == "center") {
            const [cx, cy] = value.replace(/\s/g, "").substring(2, value.length - 2).split(',').map(Number);
            return { cx, cy };
        } else if (["width", "height", "diameter", "z-order"].includes(key)) {
            return Number(value.substring(1, value.length - 1))
        }
    }

}