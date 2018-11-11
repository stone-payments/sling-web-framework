const { exec, env } = require('shelljs');
const { join } = require('path');
const camelcase = require('camelcase');
const os = require('os');

const getScope = require('./helpers/getScope');

const scope = getScope();

if (scope === '*') {
  throw new Error('A package must be provided. Run "npm run night package-name".');
}

console.log(`Testing ${scope !== '*' ? scope : 'all packages'}\n`);

const nightwatchBin = join('node_modules/.bin/nightwatch');

const webpackDevServer = join('node_modules/.bin/webpack-dev-server');
const webpackConfig = join('scripts/config/webpack.night.config.js');

const setupSelenium = 'node selenium-setup';

const testFile = `packages/${scope}/src/component/${camelcase(scope).replace('slingWebComponent', '')}.regression.test.js`;

env.PKG = scope;

if (os.platform() === 'win32') {
  const killNode = 'taskkill /im node.exe /F';

  exec(`${setupSelenium}`);
  exec(`call start /MIN "webpack" ${webpackDevServer} --config ${webpackConfig} --port 8777`, { async: true });

  setTimeout(() => {
    exec(`${nightwatchBin} ${testFile} && ${killNode}`);
  }, 1000);
} else {
  const killNode = 'kill $(ps aux | grep \'node\' | awk \'{print $2}\')';
  exec(`${setupSelenium} && ${webpackDevServer} --config ${webpackConfig} --port 8777 & ${nightwatchBin} ${testFile} && ${killNode}`);
}
