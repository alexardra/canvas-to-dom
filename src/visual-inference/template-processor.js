import TemplateMatcher from "./template-matcher";

export default class TemplateProcessor {

    constructor(src, assets) {
        // console.log(assets);
        this.matchers = [];
        for (let asset of assets) {
            let image = new Image();
            image.src = asset;
            image.onload = () => {
                this.matchers.push(new TemplateMatcher(src, asset));
            }
        }
    }

    removeMatchedTemplatesFromCanvas() {
        for (let templateMatcher of this.matchers) {
            // get information from template matcher
            // 0 out part of canvas
        }
    }
}