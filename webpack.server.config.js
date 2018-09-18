const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlStringReplace = require('html-replace-webpack-plugin');
const getBasePath = require('./scripts/helpers/getBasePath');

const basePath = getBasePath();

module.exports = () => ({
  mode: 'development',
  resolve: {
    mainFields: ['module', 'jsnext:main', 'main']
  },
  context: resolve(__dirname, basePath),
  entry: {
    app: './src/index.js'
  },
  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    contentBase: [
      resolve(__dirname, `${basePath}/public`),
      resolve(__dirname, `./packages`)
    ],
    watchContentBase: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './public/index.html'
    }),
    new HtmlStringReplace([{
      pattern: /<script.*?\/script>/,
      replacement: ''
    }])
  ]
});
