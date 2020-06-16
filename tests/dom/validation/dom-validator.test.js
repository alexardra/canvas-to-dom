
import TreeValidator from "../../../src/dom/validation/tree-validator";
import DomTrees from "../../mocks/dom-trees.json";
import { TagPatterns } from "../../../src/dom/supported-features"

const tagProperties = Object.keys(TagPatterns);

test("simple correct structure", () => {
    const testDoms = DomTrees["simple correct structure"];

    for (let i = 0; i < testDoms.length; i++) {
        const document = new DOMParser().parseFromString(testDoms[i], "text/html");
        const treeValidator = new TreeValidator(document);

        expect(treeValidator.isValid).toBeTruthy();
        expect(treeValidator.containsAllProperties).toBeFalsy();
        expect(treeValidator.tagsWithMissingProperties).toBeTruthy();

        Object.values(treeValidator.tagsWithMissingProperties).forEach((missingProperties) => {
            expect(missingProperties).toEqual(tagProperties
            );
        })
    }
});