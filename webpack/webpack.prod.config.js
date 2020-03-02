var webpack = require("webpack");
var commonWebpackConfig = require("./webpack.common");
const dotenv = require("dotenv").config();
if (dotenv.error) {
  throw dotenv.error;
}

if (!process.env.BACKEND_BASE_URL) {
  throw ("BACKEND_BASE_URL not found");
}

  module.exports = {
    mode: "production",
    ...commonWebpackConfig,
    plugins: [
      ...commonWebpackConfig.plugins,
      new webpack.DefinePlugin({
        BACKEND_BASE_URL: JSON.stringify(process.env.BACKEND_BASE_URL)
      })
    ]
  };
