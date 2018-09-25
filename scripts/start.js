const { exec, env } = require('shelljs');
const { join } = require('path');

const getScope = require('./helpers/getScope');

const scope = getScope();

if (scope === '*') {
  throw new Error('A package must be provided. Run "npm start package-name".');
}

console.log(`Starting ${scope !== '*' ? scope : 'all packages'}\n`);

const webpackDevServer = join('node_modules/.bin/webpack-dev-server');
const webpackConfig = join('scripts/config/webpack.start.config.js');

env.PKG = scope;

exec(`${webpackDevServer} --config ${webpackConfig}`);
