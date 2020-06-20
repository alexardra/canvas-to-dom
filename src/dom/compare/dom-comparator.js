
export default class DomComparator {

    constructor(firstDom, secondDom) {
        this._firstDom = firstDom.getElementsByTagName("canvas")[0];
        this._secondDom = secondDom.getElementsByTagName("canvas")[0];;
    }

    areEqual(options) {
        const firstDomNodes = this._domToNodeList(this._firstDom);
        const secondDomNodes = this._domToNodeList(this._secondDom);

        if (firstDomNodes.length != secondDomNodes.length) return false;

        for (let nodeToCompare of firstDomNodes) {
            const foundNodes = secondDomNodes.filter((node) => {
                return node.nodeName === nodeToCompare.nodeName &&
                    node.getAttribute("z-order") == nodeToCompare.getAttribute("z-order") &&
                    node.getAttribute("center") == nodeToCompare.getAttribute("center") &&
                    node.getAttribute("orientation") == nodeToCompare.getAttribute("orientation");
            });
            if (foundNodes.length != 1) return false;
        }
        return true;
    }

    _domToNodeList(dom) {
        return Array.from(dom.getElementsByTagName("*"));
    }
}