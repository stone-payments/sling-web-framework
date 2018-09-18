const { exec, env } = require('shelljs');

const getScope = require('./helpers/getScope');

const scope = getScope();

if (scope === '*') {
  throw new Error('A package must be provided. Run "npm start package-name".');
}

console.log(`Starting ${scope !== '*' ? scope : 'all packages'}\n`);

env.PKG_SCOPE = scope;

exec('./node_modules/.bin/webpack-dev-server --config ' +
  './webpack.server.config.js');
