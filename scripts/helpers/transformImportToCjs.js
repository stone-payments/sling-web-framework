const { transformAsync } = require('@babel/core');

module.exports = async (fileAsString) => {
  const babelified = await transformAsync(fileAsString, {
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-object-rest-spread',
      '@babel/plugin-transform-modules-commonjs',
    ],
  });
  return babelified.code;
};
