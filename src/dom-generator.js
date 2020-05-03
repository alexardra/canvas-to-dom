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
    }

    parse() {
        // assume info is array - TODO: hierarchy
        for (let tagInfo of this.domInfo) {
            let tag = new TagGenerator(tagInfo.identity);
            tag.init();

            for (let property of tagProperties) {
                if (tagInfo.hasOwnProperty(property)) {
                    this.addTagProperty(tag, property, tagInfo[property]);
                }

            }
            tag.end();
            console.log(tag.getGenerated());
        }
    }

    addTagProperty(tag, property, value) {
        // center
        if (property === "center") {
            console.log(value);
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