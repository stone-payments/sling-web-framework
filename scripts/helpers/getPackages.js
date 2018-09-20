const globby = require('globby');
const getBasePath = require('./getBasePath');

module.exports = (scope = '*') => {
  const glob = getBasePath(scope);

  return (scope === '*')
    ? globby(glob, { onlyDirectories: true })
    : Promise.resolve([glob]);
};
