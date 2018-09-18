const { exec, env } = require('shelljs');

const getScope = require('./helpers/getScope');
const getBasePath = require('./helpers/getBasePath');

const scope = getScope();
console.log(`Testing ${scope !== '*' ? scope : 'all packages'}\n`);

const basePath = getBasePath(scope);

env.PKG_SCOPE = scope;

exec(`${scope === '*' ? './node_modules/.bin/nyc ' : ''}` +
  './node_modules/.bin/mocha-webpack --colors ' +
  '--webpack-config webpack.spec.config.js ' +
  `"${basePath}/src/**/*.spec.js"`);
