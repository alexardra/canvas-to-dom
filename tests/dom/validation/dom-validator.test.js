
import TreeValidator from "../../../src/dom/validation/tree-validator.js";
import DomTrees from "../../mocks/dom-trees.json";


test("simple correct structure", () => {
    const testDoms = DomTrees["simple correct structure"];

    for (let i = 0; i < testDoms.length; i++) {
        const document = new DOMParser().parseFromString(testDoms[i], "text/html");
        const treeValidator = new TreeValidator(document);
        expect(treeValidator.isValid).toBeTruthy();
    }
});