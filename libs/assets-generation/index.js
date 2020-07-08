const fs = require("fs");
const http = require("http");
const path = require("path");
const puppeteer = require("puppeteer");
const timesnap = require("timesnap")



const supportedOptions = [
    "url",
    "selectorId",
    "selectorCls",
    "outputFrame",
    "frame"
]

const getOptionsFromCmd = () => {
    const options = {};
    const argsCount = process.argv.length - 2;
    for (let i = 0; i < argsCount; i++) {
        try {
            const option = process.argv[i + 2].split("=");
            let key = option[0];
            let value = option[1];

            if (supportedOptions.includes(key)) {
                options[key] = value;
            }
        } catch (err) {
            console.log(err);
        }
    }
    return options;
}

const generateFullOptions = (cmdOptions) => {
    const options = cmdOptions;

    if (!("url" in options)) {
        throw new Error("url option not specified")
    }

    if ("selectorId" in options) {
        options.selector = options.selectorId;
    } else if ("selectorCls" in options) {
        options.selector = options.selectorCls;
    } else {
        options.selector = "canvas";
    }

    if (!("outputFrame" in options)) {
        options.outputFrame = "screenshot.png";
    }

    if (!("frame" in options)) {
        options.frame = 0;
    } else {
        try {
            frame = parseInt(frame);
        } catch {
            throw new Error(`Invalid frame argument '${frame}', must be integer`);
        }
    }
    return options;
}

const getCanvasScreenshotUrlFromPage = async (options) => {
    let fps = options.frame - 1;
    let duration = 1 / fps;
    let start = 1;
    let outputDir = path.resolve('../../assets/frame'); //TODO: specify from options

    await timesnap({
        url: options.url,
        viewport: {
            width: 800,
            height: 600
        },
        selector: options.selector,
        fps: fps,
        duration: duration,
        start: start,
        frames: 1,
        outputDirectory: outputDir
    });

    fs.renameSync(path.join(outputDir, "1.png"), path.join(outputDir, options.outputFrame));
}

const generateFrameFromUrl = async (url, outputFrame) => {
    const frameDir = path.join(assetsDir, "frame");
    if (!fs.existsSync(frameDir)) {
        fs.mkdirSync(frameDir);
    }
    let data = url.replace(/^data:image\/\w+;base64,/, "");
    let buf = Buffer.from(data, "base64");
    fs.writeFileSync(path.join(frameDir, outputFrame), buf);
}

const download = (url, destination) => new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    http.get(url, response => {
        response.pipe(file);

        file.on('finish', () => {
            file.close(resolve(true));
        });
    }).on('error', error => {
        fs.unlink(destination);

        reject(error.message);
    });
});

const getImages = async (page) => {
    return await page.evaluate(async () => {
        return await new Promise(resolve => {
            const images = Array.from(document.images, e => e.src);
            resolve(images);
        });
    });
}

const generateImageAssetsFromPage = async (page) => {
    const images = await getImages(page);

    const imagesDir = path.join(assetsDir, "images");
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir);
    }

    for (let image of images) {
        const imagePath = path.join(imagesDir, path.basename(image));
        await download(image, imagePath);
    }
}

const generateAssets = async (options) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.goto(options.url);
        await page.waitForSelector(options.selector);
        const canvasEl = await page.$(options.selector);

        await getCanvasScreenshotUrlFromPage(options);

        await generateImageAssetsFromPage(page);

    } catch (err) {
        console.log(err);
    }
    await browser.close();
}


const cmdOptions = getOptionsFromCmd();
const options = generateFullOptions(cmdOptions);

const parentDir = path.resolve(__dirname, "../..");
const assetsDir = path.join(parentDir, "assets");

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
}

generateAssets(options); 
