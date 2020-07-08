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
if (!process.env.BACKEND_API_PATH) {
  throw "BACKEND_API_PATH not found";
}
if (!process.env.DICOM_SERVER_PATH) {
  throw "DICOM_SERVER_PATH not found";
}
if (!process.env.REACT_APP_SITE_TITLE) {
  throw "REACT_APP_SITE_TITLE not found";
}

module.exports = {
  mode: "production",
  ...commonWebpackConfig,
  plugins: [
    ...commonWebpackConfig.plugins,
    new webpack.DefinePlugin({
      BACKEND_BASE_URL: JSON.stringify(process.env.BACKEND_BASE_URL),
      BASE_NAME: JSON.stringify(process.env.BASE_NAME),
      BACKEND_API_PATH: JSON.stringify(process.env.BACKEND_API_PATH),
      DICOM_SERVER_PATH: JSON.stringify(process.env.DICOM_SERVER_PATH),
      REACT_APP_SITE_TITLE: JSON.stringify(process.env.REACT_APP_SITE_TITLE)
    })
  ]
};
