const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');

const { NODE_ENV } = process.env;

const replaceableStrObj = {
  'process.env.NODE_ENV': "'production'",
};

const plugins = [
  replace(replaceableStrObj),
  nodeResolve({
    preferBuiltins: true,
    jsnext: true,
    browser: true,
  }),
  json(),
  commonjs(),
  babel(),
];

module.exports = (args = {}) => {
  const input = args.configInput;
  const output = args.configOutput;

  if (NODE_ENV === 'es' || NODE_ENV === 'cjs') {
    return {
      input,
      output: {
        format: NODE_ENV,
        file: output,
      },
      plugins,
    };
  }

  return {};
};
