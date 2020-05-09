export default class TagGenerator {
    constructor(tagName) {
        this._tagName = tagName;
        this._tag = `<${this._tagName}>`;
    }

    addAttribute(attributeName, attributeValue) {
        let attribute = `${attributeName}="${attributeValue}"`;
        this._tag = `${this._tag.substring(0, this._tag.length - 2)} ${attribute}>`
    }

    endTag() {
        this._tag += `</${this._tagName}>`;
    }

    get tag() {
        return this._tag;
    }

    get startingTag() {
        return `<${this._tagName}>`;
    }

    get endingTag() {
        return `</${this._tagName}>`;
    }
}