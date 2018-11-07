const { resolve } = require('path');
const { existsSync } = require('fs-extra');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlStringReplace = require('html-replace-webpack-plugin');
const getBasePath = require('../helpers/getBasePath');

const basePath = getBasePath();

const entry = existsSync(resolve(basePath, './public/index.js'))
  ? ['./src/index.js', './public/index.js']
  : './src/index.js';

module.exports = () => ({
  mode: 'development',
  resolve: {
    mainFields: ['module', 'jsnext:main', 'main'],
  },
  context: resolve(basePath),
  entry,
  devServer: {
    open: false,
    hot: false,
    host: '127.0.0.1',
    historyApiFallback: true,
    publicPath: '/',
    contentBase: [
      resolve(`${basePath}/public`),
      resolve('./packages'),
    ],
    watchContentBase: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './public/index.html',
    }),
    new HtmlStringReplace([{
      pattern: /<script.*?injectDependencies.*?\/script>/,
      replacement: '',
    }]),
  ],
});
