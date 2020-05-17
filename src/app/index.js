import * as cv from "../../vendor/opencv.js";
import { JSDOM } from "jsdom";
import { Canvas, createCanvas, Image, ImageData, loadImage } from "canvas";
import fs from "fs";

const loadOpenCV = () => {
    return new Promise(resolve => {
        cv.onRuntimeInitialized = resolve;
    });
}

const installDOM = () => {
    const dom = new JSDOM();
    global.document = dom.window.document;
    global.Image = Image;
    global.HTMLCanvasElement = Canvas;
    global.ImageData = ImageData;
    global.HTMLImageElement = Image;
}

(async () => {
    installDOM();
    await loadOpenCV();
    console.log("opencv loaded");

    const image = await loadImage("../assets/frame/screenshot.png");
    console.log(image);
    const src = cv.imread(image);
    console.log(src);
    const canvas = createCanvas(300, 300);
    cv.imshow(canvas, src);
    fs.writeFileSync('output.jpg', canvas.toBuffer('image/jpeg'));
})();
