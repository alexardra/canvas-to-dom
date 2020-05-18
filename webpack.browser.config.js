require("babel-polyfill");
module.exports = {
  entry: {
    main: ["babel-polyfill", "./src/browser/index.js"]
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
