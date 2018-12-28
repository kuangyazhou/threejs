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
  },
  // rules: [
  //   {
  //     test: require.resolve("three/examples/js/controls/OrbitControls"),
  //     use: "imports-loader?THREE=three"
  //   }
  // ]
};
