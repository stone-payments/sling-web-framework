const { resolve } = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
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
        include: resolve('./packages/'),
        exclude: /((node_modules|dist|public)(\\|\/|$)|(test|spec|cafe|bundle)\.js$)/,
      },
    ],
  },
};
