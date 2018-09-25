const { resolve } = require('path');
const getBasePath = require('../helpers/getBasePath');

const basePath = getBasePath();

module.exports = () => ({
  mode: 'development',
  resolve: {
    mainFields: ['module', 'jsnext:main', 'main'],
  },
  context: resolve(basePath),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true,
          },
        },
        exclude: /((node_modules|dist|public)(\\|\/|$)|(test|spec|cafe|bundle)\.js$)/,
      },
    ],
  },
});
