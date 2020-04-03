var path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

var parentDir = path.join(__dirname, "../");

module.exports = {
  context: path.join(parentDir, ""),
  plugins: [
    new CopyWebpackPlugin([
      { from: "static" },
      { from: "index.html" },
      { from: "dicomIndex.html" }
    ])
  ],
  entry: [path.join(parentDir, "index.js")],
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, "../src/components/")
    }
  },
  output: {
    path: parentDir + "/dist",
    filename: "bundle.js"
  }
};
