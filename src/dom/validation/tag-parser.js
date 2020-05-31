export default class TagParser {

    constructor(tag) {
        this._createFullShapeInfo(tag)
    }

    _createFullShapeInfo(tag) {
        tag = tag.substring(0, tag.indexOf(">"))
        let tokens = tag.split(" ");

        let fullShapeInfo = { identity: tokens[0] };
        tokens.split(1).forEach(property => {
            let [key, value] = property.split("=");
            fullShapeInfo[key] = value;
        });
    }

}