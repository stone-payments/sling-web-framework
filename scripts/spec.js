const { exec, env } = require('shelljs');
const { join } = require('path');

const getScope = require('./helpers/getScope');
const getBasePath = require('./helpers/getBasePath');

const scope = getScope();
console.log(`Testing ${scope !== '*' ? scope : 'all packages'}\n`);

const basePath = getBasePath(scope);
const testFiles = join(basePath, 'src', '**', '*.spec.js');
const nyc = join('node_modules', '.bin', 'nyc');
const mochaWebpack = join('node_modules', '.bin', 'mocha-webpack');

env.PKG_SCOPE = scope;

exec(`${scope === '*' ? `${nyc} ` : ''}` +
  `${mochaWebpack} --colors --webpack-config webpack.spec.config.js "${testFiles}"`);
