
import DomGenerator from "../../../src/dom/generation/dom-generator";
import DomHierarchies from "../../mocks/dom-hierachies.json";
import DomTrees from "../../mocks/dom-trees.json";


test("simple correct structure", () => {
    const expectedDoms = DomTrees["simple correct structure"];
    const testHierarchies = DomHierarchies["simple correct structure"];

    for (let i = 0; i < expectedDoms.length; i++) {
        let domGenerator = new DomGenerator(testHierarchies[i]);
        expect(domGenerator.dom.replace(/\s+/g, "")).toEqual(expectedDoms[i].replace(/\s+/g, ""));
    }
});