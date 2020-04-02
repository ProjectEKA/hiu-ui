var webpack = require("webpack");
var commonWebpackConfig = require("./webpack.common");
const dotenv = require("dotenv").config();
if (dotenv.error) {
  throw dotenv.error;
}

if (!process.env.BACKEND_BASE_URL) {
  throw "BACKEND_BASE_URL not found";
}
if (!process.env.BASE_NAME) {
  throw "BASE_NAME not found";
}

module.exports = {
  mode: "production",
  ...commonWebpackConfig,
  plugins: [
    ...commonWebpackConfig.plugins,
    new webpack.DefinePlugin({
      BACKEND_BASE_URL: JSON.stringify(process.env.BACKEND_BASE_URL),
      BASE_NAME: JSON.stringify(process.env.BASE_NAME)
    })
  ]
};
