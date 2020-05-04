export default class TagGenerator {
    constructor(tagName) {
        this.tagName = tagName;
    }

    init() {
        this.tag = `<${this.tagName}`;
    }

    end_opening_tag() {
        this.tag += ">";
    }

    end() {
        this.tag += `</${this.tagName}>`;
    }

    getEnd() {
        return `</${this.tagName}>`;
    }

    is_ended() {
        return this.tag.endsWith(`</${this.tagName}>`);
    }

    addAttribute(attributeName, attributeValue) {
        this.tag += " ";
        this.tag += `${attributeName}="${attributeValue}"`;
    }

    getGenerated() {
        return this.tag;
    }
}