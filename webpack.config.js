var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    login: ["babel-polyfill", './src/login.js'],
    index: ["babel-polyfill", './src/index.js'],
    // operater: ["babel-polyfill", './src/operater.js'], 
  },
  //ES6 pack成 ES5
  output: {
    path: path.join(__dirname, 'public/dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    filename: '[name].js',
  },

  externals: {
    'vue': 'Vue',  
  },

  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js',
    }
  },

  devtool: 'source-map',

  module: {
    rules: [ //加载器   
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },

      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })
      },

      { test: /\.(eot|otf|woff|woff2|ttf|svg)(\?\S*)?$/, loader: 'file-loader', options: { limit: 1 } }
    ]
  },

  node: {
    fs: "empty"
  },

  plugins: [
    //生成css
    new ExtractTextPlugin("index.css"),

    // new webpack.optimize.UglifyJsPlugin({
    //   //生成环境启用js压缩
    //   compress: {
    //     warnings: false
    //   }
    //   //开发环境 
    //   // compress: false,
    // }),

    //生成注释
    new webpack.BannerPlugin('This file is created at ' + (new Date().toISOString())),
  ],


};