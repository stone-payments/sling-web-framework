const globby = require('globby');

module.exports = (pkg = '') => {
  const glob = [
    `${pkg}/**/*.js`,
    `!${pkg}/**/*.{test,spec,cafe}.js`,
  ];

  return globby(glob, { onlyFiles: true });
};
