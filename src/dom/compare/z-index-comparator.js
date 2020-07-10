export default class ZIndexComparator {

    constructor(delta) {
        this._delta = delta;
    }

    areEqual(nodeZOrder, nodeToCompareZOrder) {
        if (this._delta == -1) {
            this._delta = nodeToCompareZOrder - nodeZOrder; // first time 
            return true;
        }
        return nodeToCompareZOrder - nodeZOrder == this._delta;
    }
}  