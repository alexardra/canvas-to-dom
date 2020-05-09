import * as cv from "../../lib/opencv.js";
import TemplateMatcher from "./template-matcher";
import PreProcessor from "./preprocessor.js";

export default class TemplateProcessor {

    constructor(src, assets) {
        this.matchers = [];

        var image = new Image();
        image.src = "assets/one.png";  // temp hardcoded for testing
        image.onload = () => {
            let template = cv.imread(image);
            const templatePreProcessor = new PreProcessor(template);
            templatePreProcessor.process();

            const matcher = new TemplateMatcher(src, template);
            matcher.drawRectangle('template');
        }
    }

    removeMatchedTemplatesFromCanvas() {
        for (let templateMatcher of this.matchers) {
            // get information from template matcher
            // 0 out part of canvas
        }
    }
}