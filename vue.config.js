module.exports = {
  devServer: {
    https: false,
    disableHostCheck: true,
    proxy: {
      "#/api": {
        target: "http://localhost:3000"
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
  },
  chainWebpack: config => {
    config.plugin('VuetifyLoaderPlugin').tap(args => [{
      match (originalTag, { kebabTag, camelTag, path, component }) {
        if (kebabTag.startsWith('core-')) {
          return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
        }
      }
    }])
  }
};