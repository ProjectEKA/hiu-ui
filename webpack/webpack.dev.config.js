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
      BACKEND_BASE_URL: JSON.stringify("http://localhost:8080")
    })
  ],
  devServer: {
    contentBase: parentDir,
    historyApiFallback: true,
    proxy: {
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
      "/consent-requests": {
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
