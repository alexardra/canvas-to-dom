module.exports = {
    entry: {
        main: "./src/app/index.js"
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
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
