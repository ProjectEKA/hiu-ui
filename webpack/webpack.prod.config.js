var webpack = require("webpack");
var commonWebpackConfig = require("./webpack.common");

module.exports = {
  mode: "production",
  ...commonWebpackConfig,
  plugins: [
    ...commonWebpackConfig.plugins,
    new webpack.DefinePlugin({
      BACKEND_BASE_URL: JSON.stringify("https://hiu-dev.projecteka.in")
    })
  ]
};
