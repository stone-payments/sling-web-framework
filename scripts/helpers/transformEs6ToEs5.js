const { transformAsync } = require('@babel/core');

module.exports = async (fileAsString) => {
  const babelified = await transformAsync(fileAsString, {
    presets: [
      ['@babel/env', { modules: false }],
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-async-to-generator',
      '@babel/plugin-transform-regenerator',
    ],
  });
  return babelified.code;
};
