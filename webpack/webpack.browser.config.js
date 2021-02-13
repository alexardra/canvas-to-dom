require("babel-polyfill");
const path = require("path");

module.exports = {
    entry: {
        main: ["babel-polyfill", "./src/browser/index.js"]
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        }]
    },
    target: "node",
    resolve: {
        extensions: ["*", ".js"]
    },
    output: {
        path: path.resolve(__dirname, "../build"),
        publicPath: "/",
        filename: "canvas.to.dom.min.js"
    },
    mode: "production"
};