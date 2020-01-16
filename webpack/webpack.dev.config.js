var webpack = require("webpack");
var path = require("path");
var commonWebpackConfig = require("./webpack.common");

var parentDir = path.join(__dirname, "../");

module.exports = {
  mode: "development",
  ...commonWebpackConfig,
  plugins: [
    ...commonWebpackConfig.plugins,
    new webpack.DefinePlugin({
      BACKEND_BASE_URL: JSON.stringify("http://localhost:3000")
    })
  ],
  devServer: {
    contentBase: parentDir,
    historyApiFallback: true
  },
  devtool: "eval-source-map"
};
