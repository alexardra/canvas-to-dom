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
        path: __dirname + "/build",
        publicPath: "/",
        filename: "app.js"
    },
    mode: "development"
};
