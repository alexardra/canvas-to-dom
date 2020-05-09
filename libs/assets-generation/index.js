const puppeteer = require("puppeteer");

const generateFrameScreenshot = async (options) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.goto(options.url);
        await page.waitForSelector(options.selector);
        const canvasEl = await page.$(options.selector);
        await canvasEl.screenshot({
            path: options.outputFrame
        });
    } catch (err) {
        console.log(err);
    }
    await browser.close();
}

const supportedOptions = [
    "url",
    "selectorId",
    "selectorCls",
    "outputFrame"
]

const generateOptionsFromCmd = () => {
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

    return options;
}

const options = generateOptionsFromCmd();
generateFrameScreenshot(options);