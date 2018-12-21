const webpack = require("webpack");
module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      "/lib": {
        target: "https://www.wjceo.com/",
        changeOrigin: true
        // pathRewrite: {
        //   "": ""
        // }
      }
    },
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     THREE: "three"
    //   })
    // ]
  }
};
