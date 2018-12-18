module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      "/^": {
        target: "https://www.wjceo.com/",
        changeOrigin: true
        // pathRewrite: {
        //   "": ""
        // }
      }
    }
  }
};
