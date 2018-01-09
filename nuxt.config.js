const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack');
const path = require('path')
module.exports = {
  /*
  ** 设置head标签内容
  */
  head: {
    title: 'vue服务端渲染',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '基于vue的ssr案例' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  **设置全局css
  */
  css:[
    // 'element-ui/lib/theme-chalk/index.css',
    { src: '~/assets/style/main.css' ,lang:'scss'}
  ],
  // /*
  // ** 页面加载表现形式
  // */
  loading: '~/components/loading',
  /*
  ** 扩展webpack打包规则
  */
  build: {
    /*
    ** 扩展webpack打包规则
    */
    extend (config, ctx) {
      config.devtool = false;
      config.entry.element='~/plugins/element';
      config.output.chunkFilename="[name].[hash:5].js";
    },
    styleResources:true,
    babel:{
      "presets": [
        ['vue-app',"es2015"]
      ],
      "plugins": [["component", [
        {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }
      ]]]
    },
    loaders:[
      {test:/\.css$/,loader:ExtractTextPlugin.extract('style','css')}
    ],
    extractCSS:true,
    plugins:[
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: "publick/css/[name].[contenthash:5].css",
        allChunks: true,
      })
    ],
    analyze: false,
    // vendor:['element-ui'],
    publicPath: '/resources/',
    filenames:{
      css:'publick/css/[name].[contenthash:5].css',
      manifest: 'publick/js/[name].[hash:5].js',
      vendor: 'publick/js/[name].[hash:5].js',
      app: 'publick/js/[name].[hash:5].js'
    }
  },
  /*设置解析器*/

  /*设置外部三方插件*/
  plugins: [
    // { src: '~/plugins/element', ssr: true }
  ],
  /*设置性能选项*/
  performance: {
    gzip: true,
    prefetch: true
  },
  /*配置环境变量*/
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  dev: (process.env.NODE_ENV !== 'production') ,
  // dev:false,
  /*设置缓存机制*/
  cache: {
    max: 1000,
    maxAge: 900000
  }
}
