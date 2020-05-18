import * as cv from "../../vendor/opencv.js";
import TemplateMatcher from "./template-matcher";
import PreProcessor from "./preprocessor.js";

export default class TemplateProcessor {

    constructor(mat, assets) {
        this.mat = mat;
        this.matchers = [];
        this.assets = assets;
    }

    async process() {
        const image = await this.loadImage("assets/one.png");
        let template = cv.imread(image);
        const templatePreProcessor = new PreProcessor(template);
        templatePreProcessor.process();

        const matcher = new TemplateMatcher(this.mat, template);
        matcher.drawRectangle('template');

        this.matchers.push(matcher);
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = (err) => reject(err);
            image.src = src;
        });
    }

    removeTemplates() {
        for (let matcher of this.matchers) {
            this.removeTemplate(matcher.maxLoc, matcher.templateDimensions);
        }
        cv.imshow('boundaries', this.mat);
    }

    removeTemplate(topLeftPoint, templateDimensions) {
        for (let j = 0; j < templateDimensions.h; j++) {
            for (let i = 0; i < templateDimensions.w; i++) {
                this.mat.ucharPtr(topLeftPoint.y + j, topLeftPoint.x + i)[0] = 255;
            }
        }
    }
}