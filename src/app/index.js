// import { loadDOM, loadOpenCV, loadCanvasToDom, canvasToDOM, canvasDOMCompare } from "../main"
import { JSDOM } from "jsdom";
import { Canvas, createCanvas, Image, ImageData, loadImage } from "canvas";

// Any node-specific functionality should be added here

export const installDOM = () => {
    const dom = new JSDOM();
    global.document = dom.window.document;
    global.Image = Image;
    global.HTMLCanvasElement = Canvas;
    global.ImageData = ImageData;
    global.HTMLImageElement = Image;
}
