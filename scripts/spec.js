const { exec, env } = require('shelljs');
const { join } = require('path');

const getScope = require('./helpers/getScope');
const getBasePath = require('./helpers/getBasePath');

const scope = getScope();
console.log(`Testing ${scope !== '*' ? scope : 'all packages'}\n`);

const basePath = getBasePath(scope);
const testFiles = join(basePath, 'src/**/*.spec.js');
const nyc = join('node_modules/.bin/nyc');
const nycRc = join('scripts/config/.nycrc');
const mochaWebpack = join('node_modules/.bin/mocha-webpack');
const webpackConfig = join('scripts/config/webpack.spec.config.js');

env.PKG = scope;

exec(`${scope === '*' ? `${nyc} --nycrc-path ${nycRc} ` : ''}` +
  `${mochaWebpack} --colors --webpack-config ${webpackConfig} "${testFiles}"`);
