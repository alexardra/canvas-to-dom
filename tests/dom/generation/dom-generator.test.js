
import DomGenerator from "../../../src/dom/generation/dom-generator";
import infoInstance from "../../mocks/simple-info-hierarchy.json";

test("simple valid tree", () => {
    let domGenerator = new DomGenerator(infoInstance.canvas);
    domGenerator.generate();
    let expectedDom = '<canvas> \
                            <square center="(12,23)" width="5" height="5" z-order="-1"> \
                                <rectangle center="(45,91)" width="8" height="6" z-order="2"></rectangle> \
                                <rectangle center="(90,40)" width="8" height="6" z-order="2"> \
                                    <circle center="(100,100)" diameter="3" z-order="3"></circle> \
                                    <circle center="(150,250)" diameter="3" z-order="3"></circle> \
                                </rectangle> \
                            </square> \
                            <triangle center="(12,23)" point-0="(22,12)" point-1="(22,12)" point-2="(22,12)" z-order="-1"></triangle> \
                         </canvas>'

    expect(domGenerator.getDom().replace(/\s+/g, "")).toEqual(expectedDom.replace(/\s+/g, ""));
});


