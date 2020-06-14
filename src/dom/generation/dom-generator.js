import TagGenerator from "./tag-generator";
import { TagProperties } from "../supported-features";


export default class DomGenerator {


    constructor(domInfo) {
        this.domInfo = domInfo;
        this.dom = "";
    }

    generate() {
        this.dom = this.generateDomFromInfo(this.domInfo);
    }

    generateDomFromInfo(domInfo) {
        let dom = "";
        for (let tagInfo of domInfo) {
            let tagGenerator = new TagGenerator(tagInfo.identity);
            for (let property of TagProperties) {
                if (tagInfo.hasOwnProperty(property)) {
                    this.addTagProperty(tagGenerator, property, tagInfo[property]);
                }
            }
            dom += tagGenerator.tag;

            if (tagInfo.hasOwnProperty("children") &&
                Array.isArray(tagInfo.children) &&
                tagInfo.children.length > 0) {

                dom += this.generateDomFromInfo(tagInfo.children);
            }
            tagGenerator.endTag();
            dom += tagGenerator.endingTag;

        }

        return dom;
    }

    getDom() {
        return `<canvas>${this.dom}</canvas>`;
    }

    addTagProperty(tagGenerator, property, value) {
        if (property === "center") {
            let { cx, cy } = value;
            tagGenerator.addAttribute("center", `(${cx},${cy})`);
        } else if (property === "width" || property === "height" || property === "diameter") {
            tagGenerator.addAttribute(property, value);
        } else if (property === "points") {
            value.map((point, index) => { tagGenerator.addAttribute(`point-${index}`, `(${value[0].cx},${value[0].cy})`); });
        } else if (property === "zOrder") {
            tagGenerator.addAttribute("z-order", value);
        }
    }
}