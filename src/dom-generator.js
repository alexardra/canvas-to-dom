import TagGenerator from "./tag-generator";

export default class DomGenerator {

    constructor(domInfo) {
        this.domInfo = domInfo;
    }

    parse() {
        // assume info is array - TODO: hierarchy
        for (let tagInfo of this.domInfo) {
            let tag = new TagGenerator(tagInfo.identity);
            tag.init();

            // center
            let { cx, cy } = tagInfo.center;
            tag.addAttribute("center", `(${cx},${cy})`);

            // size 
            if (tagInfo.identity === "rectangle" || tagInfo.identity === "square") {
                tag.addAttribute("width", tagInfo.width);
                tag.addAttribute("height", tagInfo.height);
            } else if (tagInfo.identity === "triangle") {
                tag.addAttribute("point-a", `(${tagInfo.points[0].cx},${tagInfo.points[0].cy})`);
                tag.addAttribute("point-b", `(${tagInfo.points[1].cx},${tagInfo.points[1].cy})`);
                tag.addAttribute("point-c", `(${tagInfo.points[2].cx},${tagInfo.points[2].cy})`);
            } else if (tagInfo.identity === "circle") {
                tag.addAttribute("diameter", tagInfo.diameter);
            }

            // z-order 
            tag.addAttribute("z-order", tagInfo.zOrder);
            tag.end();

            console.log(tag.getGenerated());
        }
    }

}