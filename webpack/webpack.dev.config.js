var webpack = require("webpack");
var path = require("path");
var commonWebpackConfig = require("./webpack.common");
const dotenv = require("dotenv").config();
var parentDir = path.join(__dirname, "../");

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
  mode: "development",
  ...commonWebpackConfig,
  plugins: [
    ...commonWebpackConfig.plugins,
    new webpack.DefinePlugin({
      BACKEND_BASE_URL: JSON.stringify(process.env.BACKEND_BASE_URL),
      BASE_NAME: JSON.stringify(process.env.BASE_NAME)
    })
  ],
  devServer: {
    contentBase: parentDir,
    historyApiFallback: {
      rewrites: [{ from: /^\/viewer/, to: "dicomIndex.html" }]
    },
    proxy: {
      "/dicom-web": {
        changeOrigin: true,
        cookieDomainRewrite: "",
        target: "http://localhost:8042"
      },
      "/patients/*": {
        changeOrigin: true,
        cookieDomainRewrite: "https://hiu-dev.projecteka.in",
        target: "https://hiu-dev.projecteka.in",
        onProxyReq: proxyReq => {
          if (proxyReq.getHeader("origin")) {
            proxyReq.setHeader("origin", "https://hiu-dev.projecteka.in");
          }
        }
      },
      "/consent-requests/": {
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        target: "https://hiu-dev.projecteka.in",
        onProxyReq: proxyReq => {
          if (proxyReq.getHeader("origin")) {
            proxyReq.setHeader("origin", "https://hiu-dev.projecteka.in");
          }
        }
      },
      "/health-information/fetch/*": {
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        target: "https://hiu-dev.projecteka.in",
        onProxyReq: proxyReq => {
          if (proxyReq.getHeader("origin")) {
            proxyReq.setHeader("origin", "https://hiu-dev.projecteka.in");
          }
        }
      }
    }
  },
  devtool: "eval-source-map"
};
