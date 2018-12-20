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
    }
  }
};
