import { TagProperties, TagPropertyMap } from "../supported-features";
import ZIndexComparator from "./z-index-comparator";
import ColorComparator from "./color-comparator";

export default class DomComparator {

    constructor(firstDom, secondDom) {
        this._firstDom = firstDom.getElementsByTagName("canvas")[0];
        this._secondDom = secondDom.getElementsByTagName("canvas")[0];;
    }

    areEqual(options) {
        options = this._validateOptions(options);
        const firstDomNodes = this._domToNodeList(this._firstDom);
        const secondDomNodes = this._domToNodeList(this._secondDom);

        if (firstDomNodes.length != secondDomNodes.length) return false;
        const zIndexComparator = new ZIndexComparator("zOrder" in options ? options.zOrder : -1);
        const colorComparator = new ColorComparator(options.color);

        for (let nodeToCompare of firstDomNodes) {
            const foundNodes = secondDomNodes.filter((node) => {
                if (node.nodeName !== nodeToCompare.nodeName) return false;

                for (let property of TagPropertyMap[node.nodeName.toLowerCase()]) {
                    if (property == "z-order") {
                        if (!zIndexComparator.areEqual(node.getAttribute("z-order"), nodeToCompare.getAttribute("z-order"))) {
                            return false;
                        }
                    } else if (property == "color") {
                        if (!colorComparator.areEqual(node.getAttribute("color"), nodeToCompare.getAttribute("color"))) {
                            return false;
                        }
                    } else {
                        let nodeAttribute = node.getAttribute(property);
                        let nodeToCompareAttribute = nodeToCompare.getAttribute(property);
                        const delta = property.startsWith("point") ? options.points.delta : options[property].delta;

                        if (property == "center" || property.startsWith("point")) {
                            let [nodeCx, nodeCy] = nodeAttribute.replace(/\s/g, "").substring(1, nodeAttribute.length - 1).split(',').map(Number);
                            let [compareCx, compareCy] = nodeToCompareAttribute.replace(/\s/g, "").substring(1, nodeToCompareAttribute.length - 1).split(',').map(Number);

                            if (Math.abs(nodeCx - compareCx) > delta || Math.abs(nodeCy - compareCy) > delta) return false;
                        } else if (Math.abs(node.getAttribute(property) - nodeToCompare.getAttribute(property)) > delta) return false;
                    }
                }
                return true;
            })
            if (foundNodes.length < 1) return false;
        }
        return true;
    }

    _validateOptions(options) {
        if (!options) options = {};
        for (let tagProperty of TagProperties) {
            if (tagProperty == "zOrder") {
                continue;
            } else if (tagProperty == "color") {
                if (!(tagProperty in options)) {
                    options[tagProperty] = {
                        "precision": "identical",
                        "method": "CIE2000"
                    }
                } else if (!("precision" in options[tagProperty])) {
                    options[tagProperty]["precision"] = "identical";
                } else if (!("method" in options[tagProperty])) {
                    options[tagProperty]["method"] = "CIE2000";
                } else {
                    const precision = options[tagProperty]["precision"];
                    if (!["identical", "close", "similar", "distinct", "opposite"].includes(precision)) {
                        throw new Error(`Incorrect precision option '${precision}' for color property`);
                    }
                    const method = options[tagProperty]["method"];
                    if (!["CIE76", "CIE94", "CIE2000"].includes(method)) {
                        throw new Error(`Method '${method}' not supported for color property`);
                    }
                }
            } else {
                if (!(tagProperty in options)) {
                    options[tagProperty] = { "delta": 0 };
                } else {
                    if (!("delta" in options[tagProperty])) {
                        throw new Error(`Options property '${tagProperty}' must contain delta.`);
                    }
                }
            }
        }
        return options;
    }

    _domToNodeList(dom) {
        return Array.from(dom.getElementsByTagName("*"));
    }
}


