
import TreeValidator from "../../../src/dom/validation/tree-validator";
import DomTrees from "../../mocks/dom-trees.json";
import { TagPropertyMap } from "../../../src/dom/supported-features"

test("simple correct structure", () => {
    const testDoms = DomTrees["simple correct structure"];

    for (let i = 0; i < testDoms.length; i++) {
        const document = new DOMParser().parseFromString(testDoms[i], "text/html");
        const treeValidator = new TreeValidator(document);

        expect(treeValidator.isValid).toBeTruthy();
        for (let element in treeValidator.tagsWithMissingProperties) {
            let tagName = element.substring(1, element.indexOf(">"));
            expect(treeValidator.tagsWithMissingProperties[element]).toEqual(TagPropertyMap[tagName]);
        }
    }
});

test("simple full structure", () => {
    const testDoms = DomTrees["simple full structure"];

    for (let i = 0; i < testDoms.length; i++) {
        const document = new DOMParser().parseFromString(testDoms[i], "text/html");
        const treeValidator = new TreeValidator(document);

        expect(treeValidator.isValid).toBeTruthy();
        expect(treeValidator.containsAllProperties).toBeTruthy();
        expect(treeValidator.tagsWithMissingProperties).toMatchObject({});
    }
});

test("line: full correct properties", () => {
    const testDom = DomTrees["line"]["no missing properties"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeTruthy();
    expect(treeValidator.tagsWithMissingProperties).toMatchObject({});
});

test("line: missing points property", () => {
    const testDom = DomTrees["line"]["missing points property"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeFalsy();
    expect(Object.keys(treeValidator.tagsWithMissingProperties).length).toEqual(1);

    const missingProperties = Object.values(treeValidator.tagsWithMissingProperties)[0];
    expect(missingProperties.sort()).toEqual(["point-0", "point-1"].sort());
});

test("line: missing one point property", () => {
    const testDom = DomTrees["line"]["missing one point property"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeFalsy();
    expect(Object.keys(treeValidator.tagsWithMissingProperties).length).toEqual(1);

    const missingProperties = Object.values(treeValidator.tagsWithMissingProperties)[0];
    expect(missingProperties.sort()).toEqual(["point-1"].sort());
});

test("line: missing center property", () => {
    const testDom = DomTrees["line"]["missing center property"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeFalsy();
    expect(Object.keys(treeValidator.tagsWithMissingProperties).length).toEqual(1);

    const missingProperties = Object.values(treeValidator.tagsWithMissingProperties)[0];
    expect(missingProperties.sort()).toEqual(["center"].sort());
});

test("line: missing z-order property", () => {
    const testDom = DomTrees["line"]["missing z-order property"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeFalsy();
    expect(Object.keys(treeValidator.tagsWithMissingProperties).length).toEqual(1);

    const missingProperties = Object.values(treeValidator.tagsWithMissingProperties)[0];
    expect(missingProperties.sort()).toEqual(["z-order"].sort());
});

test("line: missing orientation property", () => {
    const testDom = DomTrees["line"]["missing orientation property"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeFalsy();
    expect(Object.keys(treeValidator.tagsWithMissingProperties).length).toEqual(1);

    const missingProperties = Object.values(treeValidator.tagsWithMissingProperties)[0];
    expect(missingProperties.sort()).toEqual(["orientation"].sort());
});

test("line: missing color property", () => {
    const testDom = DomTrees["line"]["missing color property"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeFalsy();
    expect(Object.keys(treeValidator.tagsWithMissingProperties).length).toEqual(1);

    const missingProperties = Object.values(treeValidator.tagsWithMissingProperties)[0];
    expect(missingProperties.sort()).toEqual(["color"].sort());
});

test("line: invalid color format", () => {
    const testDom = DomTrees["line"]["invalid color format"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeFalsy();
    expect(treeValidator.error).toBeTruthy();
    expect(treeValidator.error).toHaveProperty("message");
    expect(treeValidator.error.message).toMatch(/^Invalid value.*color$/);
});

test("line: invalid center coordinates", () => {
    const testDom = DomTrees["line"]["invalid center coordinates"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeFalsy();
    expect(treeValidator.error).toBeTruthy();
    expect(treeValidator.error).toHaveProperty("message");
    expect(treeValidator.error.message).toMatch(/^Invalid value.*center$/);
});

test("line: invalid z-order property value", () => {
    const testDom = DomTrees["line"]["invalid z-order property value"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeFalsy();
    expect(treeValidator.error).toBeTruthy();
    expect(treeValidator.error).toHaveProperty("message");
    expect(treeValidator.error.message).toMatch(/^Invalid value.*z-order$/);
});


test("line: invalid property", () => {
    const testDom = DomTrees["line"]["invalid property"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeFalsy();
    expect(treeValidator.error).toBeTruthy();
    expect(treeValidator.error).toHaveProperty("message");
    expect(treeValidator.error.message).toMatch(/^Invalid property/);
});
