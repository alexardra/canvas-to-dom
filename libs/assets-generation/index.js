const fs = require("fs");
const puppeteer = require("puppeteer");

const supportedOptions = [
    "url",
    "selectorId",
    "selectorCls",
    "outputFrame",
    "frameGrabTimeout"
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

    if (options.hasOwnProperty("selectorId")) {
        options.selector = options.selectorId;
    } else if (options.hasOwnProperty("selectorCls")) {
        options.selector = options.selectorCls;
    } else {
        options.selector = "canvas";
    }

    if (!options.hasOwnProperty("outputFrame")) {
        options.outputFrame = "screenshot.png";
    }

    if (!options.hasOwnProperty("frameGrabTimeout")) {
        options.frameGrabTimeout = 0;
    }

    return options;
}

const getCanvasScreenshotUrl = async (page, canvasEl, frameGrabTimeout) => {
    return await page.evaluate(async (canvasEl, frameGrabTimeout) => {
        return await new Promise(resolve => {
            setTimeout(() => {
                const imgUrl = canvasEl.toDataURL("image/png");
                resolve(imgUrl);
            }, frameGrabTimeout);
        });
    }, canvasEl, frameGrabTimeout);
}

const generateFrameFromUrl = async (url, outputFrame) => {
    let data = url.replace(/^data:image\/\w+;base64,/, "");
    let buf = Buffer.from(data, "base64");
    fs.writeFileSync(outputFrame, buf);
}

const generateFrameScreenshot = async (options) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.goto(options.url);
        await page.waitForSelector(options.selector);
        const canvasEl = await page.$(options.selector);

        let imgUrl = await getCanvasScreenshotUrl(page, canvasEl, options);
        generateFrameFromUrl(imgUrl, options.outputFrame);
    } catch (err) {
        console.log(err);
    }
    await browser.close();
}


const cmdOptions = getOptionsFromCmd();
const options = generateFullOptions(cmdOptions);
generateFrameScreenshot(options); 