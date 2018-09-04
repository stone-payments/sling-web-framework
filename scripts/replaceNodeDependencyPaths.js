const multiReplace = require('./multiReplace.js');

const { NODE_ENV } = process.env;

if (!NODE_ENV) {
  throw new Error('NODE_ENV must be provided.');
}

const replaceNodeDependencyPaths = fileAsString =>
  multiReplace(fileAsString, [{
    from: /(import|from)\s'.*?\/node_modules\/((?:@.*\/)?.*?)\/.*?'/g,
    to: "$1 '$2'",
  }, {
    from: /'(sling-web-.*?)'/g,
    to: `'$1/dist/${NODE_ENV}'`,
  }]);

module.exports = replaceNodeDependencyPaths;
