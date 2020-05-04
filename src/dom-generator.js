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
            let tag = new TagGenerator(tagInfo.identity);
            tag.init();

            for (let property of tagProperties) {
                if (tagInfo.hasOwnProperty(property)) {
                    this.addTagProperty(tag, property, tagInfo[property]);
                }
            }
            tag.end_opening_tag();

            dom += tag.getGenerated();

            if (tagInfo.hasOwnProperty("children") &&
                Array.isArray(tagInfo.children) &&
                tagInfo.children.length > 0) {

                dom += this.generateDomFromInfo(tagInfo.children);
            }

            tag.end();
            dom += tag.getEnd();
        }
        return dom;
    }

    getDom() {
        return this.dom;
    }

    addTagProperty(tag, property, value) {
        if (property === "center") {
            let { cx, cy } = value;
            tag.addAttribute("center", `(${cx},${cy})`);
        } else if (property === "width" || property === "height" || property === "diameter") {
            tag.addAttribute(property, value);
        } else if (property === "points") {
            tag.addAttribute("point-a", `(${value[0].cx},${value[0].cy})`);
            tag.addAttribute("point-b", `(${value[1].cx},${value[1].cy})`);
            tag.addAttribute("point-c", `(${value[2].cx},${value[2].cy})`);
        } else if (property === "zOrder") {
            tag.addAttribute("z-order", value);
        }
    }
}