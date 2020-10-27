module.exports = {
  productionSourceMap: false,
  devServer: {
    https: false,
    disableHostCheck: true,
    proxy: {
      "#/api": {
        target: "https://api.spiritjourneysworldwide.com"
      }
    }
  },
  transpileDependencies: [
    "vuetify"
  ],
  configureWebpack:{
    devServer: {
      disableHostCheck: true
    },
    optimization: {
      splitChunks: false
    },
  },
};