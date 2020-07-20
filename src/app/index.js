import * as fs from 'fs';
import { JSDOM } from "jsdom";
import { Canvas, Image } from "canvas";

// Any node-specific functionality should be added here

export const createCanvasFromImage = (imgUrl) => {
    const image = new Image();
    image.src = fs.readFileSync(imgUrl);
    const canvasEl = new Canvas(image.width, image.height);
    const context = canvasEl.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height / 4);
    return canvasEl;
}

export const installDomParser = () => {
    global.DOMParser = new JSDOM().window.DOMParser;
}