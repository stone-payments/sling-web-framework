const globby = require('globby');

module.exports = async (pattern = '', options = {}, callback = () => {}) => {
  const paths = await globby(pattern, options);
  return paths.map((path, index) => callback(path, index, paths));
};
