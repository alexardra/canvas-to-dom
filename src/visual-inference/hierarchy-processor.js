export default class HierarchyProcessor {


    constructor(hierarchyTree) {
        this._hierarchyTree = hierarchyTree;
    }

    _generateChildrenForShapesFromHierarchy(shapes, hierarchies, depth) {
        for (let entry of hierarchies) {
            let siblings = Object.keys(entry).map(Number);
            for (let sibling of siblings) {
                shapes[sibling].children = entry[sibling].map(e => Object.keys(e)).map(x => {
                    return shapes[Number(x[0])];
                });
                this._generateChildrenForShapesFromHierarchy(shapes, entry[sibling], depth + 1);
            }
        }
    }

    _getHierarchyEntry(hierarchies, index, resultEntry) {
        if (resultEntry.length != 0) return;

        for (let entry of hierarchies) {
            if (index == Number(Object.keys(entry)[0])) {
                resultEntry.push(entry);
            }
            let siblings = Object.keys(entry).map(Number);
            for (let sibling of siblings) {
                this._getHierarchyEntry(entry[sibling], index, resultEntry);
            }
        }
    }

    _getHierarchyEntryContainingIndex(hierarchies, index, resultEntry) {
        if (resultEntry.length != 0) return;

        for (let entry of hierarchies) {
            let siblings = Object.keys(entry).map(Number);
            for (let sibling of siblings) {
                if (sibling == index) {
                    resultEntry.push(entry);
                } else {
                    this._getHierarchyEntryContainingIndex(entry[sibling], index, resultEntry);
                }
            }
        }
    }


    get hierarchyTree() {
        return this._hierarchyTree;
    }


    addChildrenToShapesFromHierarchy(shapes) {
        this._generateChildrenForShapesFromHierarchy(shapes, [this.hierarchyTree], 0);
    }

    getHierarchyEntry(key) {
        let entryContainer = [];
        this._getHierarchyEntry([this.hierarchyTree], key, entryContainer);

        if (entryContainer.length == 0 || !(key in entryContainer[0]))
            throw new Error(`Some problem with hierarchy, shape with given index '${key}' should be contained`);
        return entryContainer[0];
    }

    getHierarchyEntryContainingKey(key) {
        let entryContainer = [];
        this._getHierarchyEntryContainingIndex([this.hierarchyTree], key, entryContainer);

        if (entryContainer.length == 0 || !(key in entryContainer[0]))
            throw new Error(`Some problem with hierarchy, shape with given index '${key}' should be contained`);
        return entryContainer[0];
    }

    replaceEntryWithChildren(entry) {
        let key = Object.keys(entry)[0];
        let childEntries = Object.values(entry)[0];
        for (let childEntry of childEntries) {
            let [key, value] = Object.entries(childEntry)[0];
            entry[key] = value
        }
        delete entry[key];
    }


    _removeEntry(hierarchies, key) {
        for (let entry of hierarchies) {
            let entryKey = Object.keys(entry).map(Number)[0];
            entry[entryKey] = entry[entryKey].filter((x) => {
                return Number(Object.keys(x)[0]) != key;
            });
            this._removeEntry(entry[entryKey], key);
        }
    }


    removeNoise(noise) {
        for (let key of noise) {
            this._removeEntry([this.hierarchyTree], key);
        }
    }
}