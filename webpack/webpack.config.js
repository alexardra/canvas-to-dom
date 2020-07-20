const path = require("path");

module.exports = {
    entry: {
        main: "./src/app/index.js"
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
        path: path.resolve(__dirname, "../build"),
        publicPath: "/",
        filename: "app.js"
    },
    mode: "production"
};
