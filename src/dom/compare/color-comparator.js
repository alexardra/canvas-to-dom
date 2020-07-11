export default class ColorComparator {
    constructor(options) {
        this._precision = options.precision;
        this._method = options.method;

        this.D65 = [95.047, 100, 108.883];
        this.KConstants = [1.0, 0.045, 0.015];
    }

    areEqual(nodeHex, nodeToCompareHex) {
        const deltaE = this.getDelta(this.hexToLAB(nodeHex), this.hexToLAB(nodeToCompareHex));
        if (this._precision == "identical") {
            return deltaE <= 1.0;
        }
        if (this._precision == "close") {
            return deltaE <= 2.0 && deltaE > 1.0;
        }
        if (this._precision == "similar") {
            return deltaE <= 10.0 && deltaE > 2;
        }
        if (this._precision == "distinct") {
            return deltaE <= 49.0 && deltaE > 10;
        }
        return true;
    }

    getDelta(lab1, lab2) {
        if (this._method == "CIE76") {
            return this.deltaE76(lab1, lab2);
        } else if (this._method == "CIE94") {
            return this.deltaE94(lab1, lab2);
        }
        return this.deltaE00(lab1, lab2);
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

    labToLch([l, a, b]) {
        const c = Math.sqrt(a * a + b * b)
        const h = abToHue(a, b)
        return [l, c, h]
    }

    /**
     * Converts a and b of Lab color space to Hue of LCH color space.
     * https://stackoverflow.com/questions/53733379/conversion-of-cielab-to-cielchab-not-yielding-correct-result
     * @param  {number} a
     * @param  {number} b
     * @return {number}
     */
    abToHue(a, b) {
        if (a >= 0 && b === 0) {
            return 0
        }
        if (a < 0 && b === 0) {
            return 180
        }
        if (a === 0 && b > 0) {
            return 90
        }
        if (a === 0 && b < 0) {
            return 270
        }
        let xBias
        if (a > 0 && b > 0) {
            xBias = 0
        } else if (a < 0) {
            xBias = 180
        } else if (a > 0 && b < 0) {
            xBias = 360
        }
        return radiansToDegrees(Math.atan(b / a)) + xBias
    }

    radiansToDegrees(radians) {
        return radians * (180 / Math.PI)
    }

    deltaE76(lab1, lab2) {
        return Math.sqrt(Math.pow(lab2[0] - lab1[0], 2) + Math.pow(lab2[1] - lab1[1], 2) + Math.pow(lab2[2] - lab1[2], 2));
    }

    deltaE94(lab1, lab2) {
        var deltaL = lab1[0] - lab2[0];
        let deltaA = lab1[1] - lab2[1];
        let deltaB = lab1[2] - lab2[2];

        let c1 = Math.Sqrt(Math.Pow(lab1[1], 2) + Math.Pow(lab1[2], 2));
        let c2 = Math.Sqrt(Math.Pow(lab2[1], 2) + Math.Pow(lab2[2], 2));
        let deltaC = c1 - c2;

        let deltaH = Math.Pow(deltaA, 2) + Math.Pow(deltaB, 2) - Math.Pow(deltaC, 2);
        deltaH = deltaH < 0 ? 0 : Math.Sqrt(deltaH);

        const sl = 1.0;
        const kc = 1.0;
        const kh = 1.0;

        let sc = 1.0 + this.KConstants[1] * c1;
        let sh = 1.0 + this.KConstants[2] * c1;

        let i = Math.Pow(deltaL / (this.KConstants[0] * sl), 2) +
            Math.Pow(deltaC / (kc * sc), 2) +
            Math.Pow(deltaH / (kh * sh), 2);
        return i < 0 ? 0 : Math.Sqrt(i);
    }

	/**
	 * The difference between two given colours with respect to the human eye
	 * @param {[type]} l1 Colour 1
	 * @param {[type]} a1 Colour 1
	 * @param {[type]} b1 Colour 1
	 * @param {[type]} l2 Colour 2
	 * @param {[type]} a2 Colour 2
	 * @param {[type]} b2 Colour 2
	 */
    deltaE00(lab1, lab2) {
        // l1, a1, b1, l2, a2, b2
        const [l1, a1, b1] = lab1;
        const [l2, a2, b2] = lab2;
        // Utility functions added to Math Object
        Math.rad2deg = function (rad) {
            return 360 * rad / (2 * Math.PI);
        };
        Math.deg2rad = function (deg) {
            return (2 * Math.PI * deg) / 360;
        };
        // Start Equation
        // Equation exist on the following URL http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE2000.html
        const avgL = (l1 + l2) / 2;
        const C1 = Math.sqrt(Math.pow(a1, 2) + Math.pow(b1, 2));
        const C2 = Math.sqrt(Math.pow(a2, 2) + Math.pow(b2, 2));
        const avgC = (C1 + C2) / 2;
        const G = (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7)))) / 2;

        const A1p = a1 * (1 + G);
        const A2p = a2 * (1 + G);

        const C1p = Math.sqrt(Math.pow(A1p, 2) + Math.pow(b1, 2));
        const C2p = Math.sqrt(Math.pow(A2p, 2) + Math.pow(b2, 2));

        const avgCp = (C1p + C2p) / 2;

        let h1p = Math.rad2deg(Math.atan2(b1, A1p));
        if (h1p < 0) {
            h1p = h1p + 360;
        }

        let h2p = Math.rad2deg(Math.atan2(b2, A2p));
        if (h2p < 0) {
            h2p = h2p + 360;
        }

        const avghp = Math.abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h1p) / 2;

        const T = 1 - 0.17 * Math.cos(Math.deg2rad(avghp - 30)) + 0.24 * Math.cos(Math.deg2rad(2 * avghp)) + 0.32 * Math.cos(Math.deg2rad(3 * avghp + 6)) - 0.2 * Math.cos(Math.deg2rad(4 * avghp - 63));

        let deltahp = h2p - h1p;
        if (Math.abs(deltahp) > 180) {
            if (h2p <= h1p) {
                deltahp += 360;
            } else {
                deltahp -= 360;
            }
        }

        const delta_lp = l2 - l1;
        const delta_cp = C2p - C1p;

        deltahp = 2 * Math.sqrt(C1p * C2p) * Math.sin(Math.deg2rad(deltahp) / 2);

        const Sl = 1 + ((0.015 * Math.pow(avgL - 50, 2)) / Math.sqrt(20 + Math.pow(avgL - 50, 2)));
        const Sc = 1 + 0.045 * avgCp;
        const Sh = 1 + 0.015 * avgCp * T;

        const deltaro = 30 * Math.exp(-(Math.pow((avghp - 275) / 25, 2)));
        const Rc = 2 * Math.sqrt(Math.pow(avgCp, 7) / (Math.pow(avgCp, 7) + Math.pow(25, 7)));
        const Rt = -Rc * Math.sin(2 * Math.deg2rad(deltaro));

        const kl = 1;
        const kc = 1;
        const kh = 1;

        const deltaE = Math.sqrt(Math.pow(delta_lp / (kl * Sl), 2) + Math.pow(delta_cp / (kc * Sc), 2) + Math.pow(deltahp / (kh * Sh), 2) + Rt * (delta_cp / (kc * Sc)) * (deltahp / (kh * Sh)));

        return deltaE;
    }
}