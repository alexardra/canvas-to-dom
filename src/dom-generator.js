import TagGenerator from "./tag-generator";

const tagProperties = [
    "center",
    "width", "height", "diameter", "points",
    "color",
    "zOrder",
    "orientation"
]

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

            for (let property of tagProperties) {
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
            dom += tagGenerator.tag;
        }
        return dom;
    }

    getDom() {
        return this.dom;
    }

    addTagProperty(tagGenerator, property, value) {
        if (property === "center") {
            let { cx, cy } = value;
            tagGenerator.addAttribute("center", `(${cx},${cy})`);
        } else if (property === "width" || property === "height" || property === "diameter") {
            tagGenerator.addAttribute(property, value);
        } else if (property === "points") {
            tagGenerator.addAttribute("point-a", `(${value[0].cx},${value[0].cy})`);
            tagGenerator.addAttribute("point-b", `(${value[1].cx},${value[1].cy})`);
            tagGenerator.addAttribute("point-c", `(${value[2].cx},${value[2].cy})`);
        } else if (property === "zOrder") {
            tagGenerator.addAttribute("z-order", value);
        }
    }
}