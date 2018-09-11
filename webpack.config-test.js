const path = require('path');

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
        include: path.resolve('./packages/'),
        exclude: /((node_modules|dev|dist)(\\|\/|$)|(test|bundle).js$)/,
      },
    ],
  },
};
