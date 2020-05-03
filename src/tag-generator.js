export default class TagGenerator {
    constructor(tagName) {
        this.tagName = tagName;
    }

    init() {
        this.tag = `<${this.tagName}`;
    }

    end() {
        this.tag += `></${this.tagName}>`;
    }

    addAttribute(attributeName, attributeValue) {
        this.tag += " ";
        this.tag += `${attributeName}="${attributeValue}"`;
    }

    getGenerated() {
        // TODO: end if tag is not ended
        return this.tag;
    }
}