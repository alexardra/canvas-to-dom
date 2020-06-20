
import DomComparator from "../../../src/dom/compare/dom-comparator";
import { getValidShapeTreeFromElement } from "../../../src/browser/helpers";
import DomHierarchies from "../../mocks/dom-hierachies.json";
import DomTrees from "../../mocks/dom-trees.json";

test("simple exact match", () => {
    const doms = DomTrees["simple full structure"];
    const domHierarchies = DomHierarchies["simple full structure"];

    for (let i = 0; i < doms.length; i++) {
        const domComparator = new DomComparator(getValidShapeTreeFromElement(doms[i]), getValidShapeTreeFromElement(domHierarchies[i]));
        expect(domComparator.areEqual()).toBeTruthy();
    }
});

