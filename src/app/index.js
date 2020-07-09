import { loadDOM, loadOpenCV, loadCanvasToDom, canvasToDOM, canvasDOMCompare } from "../main"
import { JSDOM } from "jsdom";
import { Canvas, createCanvas, Image, ImageData, loadImage } from "canvas";
import fs from "fs";


const installDOM = () => {
    const dom = new JSDOM();
    global.document = dom.window.document;
    global.Image = Image;
    global.HTMLCanvasElement = Canvas;
    global.ImageData = ImageData;
    global.HTMLImageElement = Image;
}