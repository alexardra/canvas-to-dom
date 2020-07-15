
import DomComparator from "../../../src/dom/compare/dom-comparator";
import { getValidShapeTreeFromElement } from "../../../src/helpers";
import DomHierarchies from "../../mocks/dom-hierachies.json";
import DomTrees from "../../mocks/dom-trees.json";
import ColorComparator from "../../../src/dom/compare/color-comparator";

test("simple exact match", () => {
    const doms = DomTrees["simple full structure"];
    const domHierarchies = DomHierarchies["simple full structure"];

    for (let i = 0; i < doms.length; i++) {
        const domComparator = new DomComparator(getValidShapeTreeFromElement(doms[i]), getValidShapeTreeFromElement(domHierarchies[i]));
        expect(domComparator.areEqual()).toBeTruthy();
    }
});


const closeColors = {
    "red": ["#f71b1b", "#f91f1f", "#f52222", "#f91d1e"],
    "blue": ["#0699f1", "#0b9cf3", "#0495ec", "#0b98ec"],
    "green": ["#0def0d", "#02ef02", "#0fef0f", "#0af30b"],
    "yellow": ["#ffff00", "#ffff0b", "#ffff0e", "#f7f701"],
    "brown": ["#a52a2a", "#ab2929", "#ab2d2d", "#a02828"],
    "grey": ["#808080", "#828181", "#7f7e7e", "#797878"]
}

const checkColors = (comparator, closeColors) => {
    for (let i = 0; i < closeColors.length - 1; i++) {
        for (let j = 1; j < closeColors.length; j++) {
            expect(comparator.areEqual(closeColors[i], closeColors[j])).toBeTruthy();
        }
    }
}

test("close colors", () => {
    const closeColorComparator76 = new ColorComparator({
        "method": "CIE76",
        "precision": "close"
    });
    const closeColorComparator94 = new ColorComparator({
        "method": "CIE94",
        "precision": "close"
    });
    const closeColorComparator2000 = new ColorComparator({
        "method": "CIE2000",
        "precision": "close"
    });

    for (let color in closeColors) {
        checkColors(closeColorComparator76, closeColors[color]);
        checkColors(closeColorComparator94, closeColors[color]);
        checkColors(closeColorComparator2000, closeColors[color]);
    }
});

const similarColors = {
    "red": ["#f71b1b", "#f50b0b", "#f52222", "#f51616"],
    "blue": ["#0699f1", "#1c9bf7", "#1293f1", "#0983dc"],
    "green": ["#008000", "#059205", "#078407", "#0e860e"],
    "yellow": ["#ffff00", "#ecec0f", "#f9f912", "#eaea0a"],
    "brown": ["#a52a2a", "#c13636", "#a72727", "#a93333"],
    "grey": ["#808080", "#8e8c8c", "#867f7f", "#797879"]
}

test("similar colors", () => {
    const similarColorComparator76 = new ColorComparator({
        "method": "CIE76",
        "precision": "similar"
    });
    const similarColorComparator94 = new ColorComparator({
        "method": "CIE94",
        "precision": "similar"
    });
    const similarColorComparator2000 = new ColorComparator({
        "method": "CIE2000",
        "precision": "similar"
    });

    for (let color in similarColors) {
        checkColors(similarColorComparator76, similarColors[color]);
        checkColors(similarColorComparator94, similarColors[color]);
        checkColors(similarColorComparator2000, similarColors[color]);
    }
});

const distinctColors = {
    "red": ["#f71b1b", "#e41616", "#e85151", "#d05050"],
    "blue": ["#0699f1", "#1a8dd2", "#0a82ca", "#36a2e2"],
    "green": ["#008000", "#09bd09", "#3cce3c", "#189e19"],
    "yellow": ["#ffff00", "#d6d63a", "#a9a918", "#9a9a01"],
    "brown": ["#a52a2a", "#711111", "#d85959", "#da3e3e"],
    "grey": ["#808080", "#bfb8b8", "#928686", "#696464"]
}

test("distinct colors", () => {
    const distinctColorComparator76 = new ColorComparator({
        "method": "CIE76",
        "precision": "distinct"
    });
    const distinctColorComparator94 = new ColorComparator({
        "method": "CIE94",
        "precision": "distinct"
    });
    const distinctColorComparator2000 = new ColorComparator({
        "method": "CIE2000",
        "precision": "distinct"
    });

    for (let color in distinctColors) {
        checkColors(distinctColorComparator76, distinctColors[color]);
        checkColors(distinctColorComparator94, distinctColors[color]);
        checkColors(distinctColorComparator2000, distinctColors[color]);
    }
});

test("opposite colors", () => {
    const oppositeColorComparator76 = new ColorComparator({
        "method": "CIE76",
        "precision": "opposite"
    });
    const oppositeColorComparator94 = new ColorComparator({
        "method": "CIE94",
        "precision": "opposite"
    });
    const oppositeColorComparator2000 = new ColorComparator({
        "method": "CIE2000",
        "precision": "opposite"
    });

    const red = distinctColors["red"][0];
    const blue = distinctColors["blue"][0];
    const green = distinctColors["green"][0];

    expect(oppositeColorComparator76.areEqual(red, blue)).toBeTruthy();
    expect(oppositeColorComparator94.areEqual(red, blue)).toBeTruthy();
    expect(oppositeColorComparator2000.areEqual(red, blue)).toBeTruthy();

    expect(oppositeColorComparator76.areEqual(green, blue)).toBeTruthy();
    expect(oppositeColorComparator94.areEqual(green, blue)).toBeTruthy();
    expect(oppositeColorComparator2000.areEqual(green, blue)).toBeTruthy();

    expect(oppositeColorComparator76.areEqual(green, red)).toBeTruthy();
    expect(oppositeColorComparator94.areEqual(green, red)).toBeTruthy();
    expect(oppositeColorComparator2000.areEqual(green, red)).toBeTruthy();
});