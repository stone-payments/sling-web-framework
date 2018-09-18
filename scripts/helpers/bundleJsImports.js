const { rollup } = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonJs = require('rollup-plugin-commonjs');

module.exports = packageName => async filePath => {
  const bundle = await rollup({
    input: filePath,
    plugins: [
      nodeResolve({
        module: true,
        jsnext: true,
        main: true,
        browser: false
      }),
      commonJs()
    ]
  });

  const { code } = await bundle.generate({
    format: 'iife',
    name: packageName
  });

  return code;
};
