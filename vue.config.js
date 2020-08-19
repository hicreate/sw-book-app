module.exports = {
  devServer: {
    https: false,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack:{
    devServer: {
      disableHostCheck: true
    },
  }
};