import { TagProperties, TagPropertyMap } from "../supported-features";

export default class DomComparator {

    constructor(firstDom, secondDom) {
        this._firstDom = firstDom.getElementsByTagName("canvas")[0];
        this._secondDom = secondDom.getElementsByTagName("canvas")[0];;
    }

    areEqual(options) {
        this._validateOptions(options);
        const firstDomNodes = this._domToNodeList(this._firstDom);
        const secondDomNodes = this._domToNodeList(this._secondDom);

        console.log(firstDomNodes, secondDomNodes);
        console.log(options);
        if (firstDomNodes.length != secondDomNodes.length) return false;


        for (let nodeToCompare of firstDomNodes) {
            const foundNodes = secondDomNodes.filter((node) => {
                if (node.nodeName !== nodeToCompare.nodeName) return false;

                for (let property of TagPropertyMap[node.nodeName.toLowerCase()]) {
                    if (["z-order", "color"].includes(property)) continue; // TEMP - different comparison

                    let nodeAttribute = node.getAttribute(property);
                    let nodeToCompareAttribute = nodeToCompare.getAttribute(property);
                    const delta = property.startsWith("point") ? options.points.delta : options[property].delta;

                    if (property == "center" || property.startsWith("point")) {
                        let [nodeCx, nodeCy] = nodeAttribute.replace(/\s/g, "").substring(1, nodeAttribute.length - 1).split(',').map(Number);
                        let [compareCx, compareCy] = nodeToCompareAttribute.replace(/\s/g, "").substring(1, nodeToCompareAttribute.length - 1).split(',').map(Number);

                        if (Math.abs(nodeCx - compareCx) > delta || Math.abs(nodeCy - compareCy) > delta) return false;
                    } else if (Math.abs(node.getAttribute(property) - nodeToCompare.getAttribute(property)) > delta) return false;

                }
                return true;
            })

            if (foundNodes.length < 1) return false;
        }
        return true;
    }

    _validateOptions(options) {
        for (let tagProperty of TagProperties) {
            if (["zOrder", "color"].includes(tagProperty)) continue;
            if (!(tagProperty in options)) {
                options[tagProperty] = { "delta": 0 };
            } else {
                if (!("delta" in options[tagProperty])) {
                    throw new Error(`Options property '${tagProperty}' must contain delta.`);
                }
            }
        }
    }

    _domToNodeList(dom) {
        return Array.from(dom.getElementsByTagName("*"));
    }
}


