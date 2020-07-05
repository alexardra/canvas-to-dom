
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

test("triangle: no missing properties", () => {
    const testDom = DomTrees["triangle"]["no missing properties"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeTruthy();
    expect(treeValidator.tagsWithMissingProperties).toMatchObject({});
});

test("triangle: missing points property", () => {
    const testDom = DomTrees["triangle"]["missing points property"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeFalsy();
    expect(Object.keys(treeValidator.tagsWithMissingProperties).length).toEqual(1);

    const missingProperties = Object.values(treeValidator.tagsWithMissingProperties)[0];
    expect(missingProperties.sort()).toEqual(["point-0", "point-1", "point-2"].sort());
});

test("triangle: incorrect additional points", () => {
    const testDom = DomTrees["triangle"]["incorrect additional points"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeFalsy();
    expect(treeValidator.error).toBeTruthy();
    expect(treeValidator.error).toHaveProperty("message");
    expect(treeValidator.error.message).toMatch(/^Invalid property.*point-3.*$/);
});

test("triangle: incorrect additional width property", () => {
    const testDom = DomTrees["triangle"]["incorrect additional width property"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeFalsy();
    expect(treeValidator.error).toBeTruthy();
    expect(treeValidator.error).toHaveProperty("message");
    expect(treeValidator.error.message).toMatch(/^Invalid property.*width.*$/);
});

test("triangle: incorrect additional height property", () => {
    const testDom = DomTrees["triangle"]["incorrect additional height property"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeFalsy();
    expect(treeValidator.error).toBeTruthy();
    expect(treeValidator.error).toHaveProperty("message");
    expect(treeValidator.error.message).toMatch(/^Invalid property.*height.*$/);
});

test("triangle: incorrect additional diameter", () => {
    const testDom = DomTrees["triangle"]["incorrect additional diameter"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeFalsy();
    expect(treeValidator.error).toBeTruthy();
    expect(treeValidator.error).toHaveProperty("message");
    expect(treeValidator.error.message).toMatch(/^Invalid property.*diameter.*$/);
});

test("rectangle/square: no missing properties", () => {
    const testDoms = [];
    testDoms.push(DomTrees["rectangle"]["no missing properties"]);
    testDoms.push(DomTrees["square"]["no missing properties"]);

    for (let testDom of testDoms) {
        const document = new DOMParser().parseFromString(testDom, "text/html");
        const treeValidator = new TreeValidator(document);
        expect(treeValidator.isValid).toBeTruthy();
        expect(treeValidator.containsAllProperties).toBeTruthy();
        expect(treeValidator.tagsWithMissingProperties).toMatchObject({});
    }
});

test("rectangle/square: missing properties", () => {
    const testDoms = [];
    testDoms.push(DomTrees["rectangle"]["missing properties"]);
    testDoms.push(DomTrees["square"]["missing properties"]);

    for (let testDom of testDoms) {
        const document = new DOMParser().parseFromString(testDom, "text/html");
        const treeValidator = new TreeValidator(document);
        expect(treeValidator.isValid).toBeTruthy();
        expect(treeValidator.containsAllProperties).toBeFalsy();
        expect(Object.keys(treeValidator.tagsWithMissingProperties).length).toEqual(1);

        const missingProperties = Object.values(treeValidator.tagsWithMissingProperties)[0];
        expect(missingProperties.sort()).toEqual(["center", "color", "height", "orientation", "width", "z-order"].sort());
    }
});

test("rectangle/square: missing width property", () => {
    const testDoms = [];
    testDoms.push(DomTrees["rectangle"]["missing width property"]);
    testDoms.push(DomTrees["square"]["missing width property"]);

    for (let testDom of testDoms) {
        const document = new DOMParser().parseFromString(testDom, "text/html");
        const treeValidator = new TreeValidator(document);
        expect(treeValidator.isValid).toBeTruthy();
        expect(treeValidator.containsAllProperties).toBeFalsy();
        expect(Object.keys(treeValidator.tagsWithMissingProperties).length).toEqual(1);

        const missingProperties = Object.values(treeValidator.tagsWithMissingProperties)[0];
        expect(missingProperties.sort()).toEqual(["width"].sort());
    }
});

test("rectangle/square: incorrect center property", () => {
    const testDoms = [];
    testDoms.push(DomTrees["rectangle"]["incorrect center property"]);
    testDoms.push(DomTrees["square"]["incorrect center property"]);

    for (let testDom of testDoms) {
        const document = new DOMParser().parseFromString(testDom, "text/html");
        const treeValidator = new TreeValidator(document);
        expect(treeValidator.isValid).toBeFalsy();
        expect(treeValidator.error).toBeTruthy();
        expect(treeValidator.error).toHaveProperty("message");
        expect(treeValidator.error.message).toMatch(/^Invalid value.*center.*$/);
    }
});

test("rectangle/square: incorrect additional points", () => {
    const testDoms = [];
    testDoms.push(DomTrees["rectangle"]["incorrect additional points"]);
    testDoms.push(DomTrees["square"]["incorrect additional points"]);

    for (let testDom of testDoms) {
        const document = new DOMParser().parseFromString(testDom, "text/html");
        const treeValidator = new TreeValidator(document);
        expect(treeValidator.isValid).toBeFalsy();
        expect(treeValidator.error).toBeTruthy();
        expect(treeValidator.error).toHaveProperty("message");
        expect(treeValidator.error.message).toMatch(/^Invalid property.*point-0.*$/);
    }
});

test("circle: no missing properties", () => {
    const testDom = DomTrees["circle"]["no missing properties"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeTruthy();
    expect(treeValidator.tagsWithMissingProperties).toMatchObject({});
});

test("circle: missing properties", () => {
    const testDom = DomTrees["circle"]["missing properties"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeFalsy();
    expect(Object.keys(treeValidator.tagsWithMissingProperties).length).toEqual(1);

    const missingProperties = Object.values(treeValidator.tagsWithMissingProperties)[0];
    expect(missingProperties.sort()).toEqual(["center", "color", "diameter", "orientation", "z-order"].sort());
});

test("circle: missing diameter property", () => {
    const testDom = DomTrees["circle"]["missing diameter property"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeFalsy();
    expect(Object.keys(treeValidator.tagsWithMissingProperties).length).toEqual(1);

    const missingProperties = Object.values(treeValidator.tagsWithMissingProperties)[0];
    expect(missingProperties.sort()).toEqual(["diameter"].sort());
});


test("circle: missing color property", () => {
    const testDom = DomTrees["circle"]["missing color property"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeFalsy();
    expect(Object.keys(treeValidator.tagsWithMissingProperties).length).toEqual(1);

    const missingProperties = Object.values(treeValidator.tagsWithMissingProperties)[0];
    expect(missingProperties.sort()).toEqual(["color"].sort());
});

test("circle: incorrect additional points", () => {
    const testDom = DomTrees["circle"]["incorrect additional points"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeFalsy();
    expect(treeValidator.error).toBeTruthy();
    expect(treeValidator.error).toHaveProperty("message");
    expect(treeValidator.error.message).toMatch(/^Invalid property.*point-0.*$/);
});

test("circle: incorrect additional width", () => {
    const testDom = DomTrees["circle"]["incorrect additional width"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeFalsy();
    expect(treeValidator.error).toBeTruthy();
    expect(treeValidator.error).toHaveProperty("message");
    expect(treeValidator.error.message).toMatch(/^Invalid property.*width.*$/);
});

test("circle: incorrect additional height", () => {
    const testDom = DomTrees["circle"]["incorrect additional height"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeFalsy();
    expect(treeValidator.error).toBeTruthy();
    expect(treeValidator.error).toHaveProperty("message");
    expect(treeValidator.error.message).toMatch(/^Invalid property.*height.*$/);
});

test("polygon: no missing properties", () => {
    const testDom = DomTrees["circle"]["no missing properties"];

    const document = new DOMParser().parseFromString(testDom, "text/html");
    const treeValidator = new TreeValidator(document);
    expect(treeValidator.isValid).toBeTruthy();
    expect(treeValidator.containsAllProperties).toBeTruthy();
    expect(treeValidator.tagsWithMissingProperties).toMatchObject({});
});
