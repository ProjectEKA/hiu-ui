var path = require("path");
var commonWebpackConfig = require("./webpack.common");

var parentDir = path.join(__dirname, "../");

module.exports = {
  mode: "development",
  ...commonWebpackConfig,
  plugins: [
    ...commonWebpackConfig.plugins,
  ],
  devServer: {
    contentBase: parentDir,
    historyApiFallback: {
      rewrites: [{ from: /^\/viewer/, to: "dicomIndex.html" }],
    },
    proxy: {
      "/dicom-web": {
        changeOrigin: true,
        cookieDomainRewrite: "",
        target: "http://localhost:8042",
      },
      "/patients/*": {
        changeOrigin: true,
        cookieDomainRewrite: "https://hiu-dev.projecteka.in",
        target: "https://hiu-dev.projecteka.in",
        onProxyReq: (proxyReq) => {
          if (proxyReq.getHeader("origin")) {
            proxyReq.setHeader("origin", "https://hiu-dev.projecteka.in");
          }
        },
      },
      "/consent-requests/": {
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        target: "https://hiu-dev.projecteka.in",
        onProxyReq: (proxyReq) => {
          if (proxyReq.getHeader("origin")) {
            proxyReq.setHeader("origin", "https://hiu-dev.projecteka.in");
          }
        },
      },
      "/health-information/fetch/*": {
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        target: "https://hiu-dev.projecteka.in",
        onProxyReq: (proxyReq) => {
          if (proxyReq.getHeader("origin")) {
            proxyReq.setHeader("origin", "https://hiu-dev.projecteka.in");
          }
        },
      },
    },
  },
  devtool: "eval-source-map",
};
