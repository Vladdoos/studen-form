const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: 'http://localhost:8485'
  },
  transpileDependencies: true
})
