import { createCanvasFromImage, installDomParser, loadOpenCV, canvasToDOM } from "../../index.js";
import * as fs from "fs";

(async () => {
    await loadOpenCV();

    const canvasEl = createCanvasFromImage("./screenshot.png");
    installDomParser();
    const dom = canvasToDOM(canvasEl, {
        "type": "json"
    });

    fs.writeFile("dom.json", JSON.stringify(dom, null, 4), (err) => {
        if (err) {
            throw err;
        }
        console.log("Successfully saved generated dom.");
    });
})();
