export default class ColorComparator {
    constructor() {
        this.D65 = [95.047, 100, 108.883];
    }

    areEqual(nodeHex, nodeToCompareHex) {
        let nodeLAB = this.hexToLAB(nodeHex);
        let nodeToCompareLAB = this.hexToLAB(nodeToCompareHex);
        if (this.deltaE76(nodeLAB, nodeToCompareLAB) == 0) return true;
        return false;
    }

    hexToLAB(hex) {
        let components = hex.substring(1).match(/.{1,2}/g).map(_ => parseInt(_, 16));
        return this.xyzToLab(this.rgbToXyz(components));
    }

    sRGBtoLinearRGB(color) {
        // Send this function a decimal sRGB gamma encoded color value
        // between 0.0 and 1.0, and it returns a linearized value.
        if (color <= 0.04045) {
            return color / 12.92
        } else {
            return Math.pow((color + 0.055) / 1.055, 2.4)
        }
    }

    rgbToXyz([r, g, b]) {
        [r, g, b] = [r, g, b].map(_ => _ / 255).map(this.sRGBtoLinearRGB)
        const X = 0.4124 * r + 0.3576 * g + 0.1805 * b
        const Y = 0.2126 * r + 0.7152 * g + 0.0722 * b
        const Z = 0.0193 * r + 0.1192 * g + 0.9505 * b

        return [X, Y, Z].map(_ => _ * 100)
    }

    xyzToLab([x, y, z]) {
        [x, y, z] = [x, y, z].map((v, i) => {
            v = v / this.D65[i]
            return v > 0.008856 ? Math.pow(v, 1 / 3) : v * 7.787 + 16 / 116
        })
        const l = 116 * y - 16
        const a = 500 * (x - y)
        const b = 200 * (y - z)
        return [l, a, b]
    }

    deltaE76(lab1, lab2) {
        return Math.sqrt(Math.pow(lab2[0] - lab1[0], 2) + Math.pow(lab2[1] - lab1[1], 2) + Math.pow(lab2[2] - lab1[2], 2));
    }
}