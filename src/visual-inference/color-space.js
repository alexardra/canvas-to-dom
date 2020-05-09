import * as cv from "../../vendor/opencv.js";

const supportedColorSpaceMap = {
    "lab": "COLOR_RGB2Lab",
    "luv": "COLOR_RGB2Luv",
    "xyz": "COLOR_RGB2XYZ",
    "yuv": "COLOR_RGB2YUV",
    "ycbcr": "COLOR_RGB2YCrCb" //default
}

export const adjustColorSpace = (src, dst, colorSpace, canvasColorSpace = "RGB") => {

    colorSpace = colorSpace.toLowerCase();

    if (!Object.keys(supportedColorSpaceMap).includes(colorSpace)) {
        throw new Error(`Color space ${colorSpace} not supported`);
    }

    cv.cvtColor(src, dst, cv[supportedColorSpaceMap[colorSpace]]);
    // return dst;
}
