import TreeValidator from "./dom/validation/tree-validator.js";
import DomGenerator from "./dom/generation/dom-generator.js";

export const getValidShapeTreeFromElement = (element) => {
    if (element.constructor != String &&
        element.constructor != Object &&
        element.constructor != HTMLDocument) {
        throw new Error(`Given element argument has wrong format`);
    }
    if (element.constructor == Object) {
        try {
            const domGenerator = new DomGenerator(element);
            element = domGenerator.dom;
        } catch (e) {
            throw new Error(`Could not generate dom from given element, ${e.message}`);
        }
    }
    if (element.constructor == String) {
        element = new DOMParser().parseFromString(element, "text/html");
    }
    const treeValidator = new TreeValidator(element);
    if (!treeValidator.isValid) {
        throw new Error(treeValidator.error);
    }
    return element;
}

export const meanAbsoluteDeviation = (arr) => { // TODO: remove from methods
    let mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    return arr.map((x) => { return Math.abs(x - mean); }).reduce((a, b) => a + b, 0) / arr.length;
}