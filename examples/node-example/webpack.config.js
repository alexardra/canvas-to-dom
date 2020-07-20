const path = require("path");

module.exports = {
    entry: {
        main: "./index.js"
    },
    module: {
        rules: [
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    },
    target: "node",
    resolve: {
        extensions: ["*", ".js"]
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        publicPath: "/",
        filename: "canvas-to-dom.bundle.js"
    },
    mode: "development"
};
