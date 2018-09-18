const { exec, env } = require('shelljs');

const getScope = require('./helpers/getScope');
const getBasePath = require('./helpers/getBasePath');

const scope = getScope();
console.log(`Testing ${scope !== '*' ? scope : 'all packages'}\n`);

const basePath = getBasePath(scope);

env.PKG_SCOPE = scope;
env.TEST_BASE = 'http://127.0.0.1:8123/packages';

exec('npm run build && ' +
  `./node_modules/.bin/testcafe firefox ${basePath}/src/**/*.cafe.js ` +
  `--app "http-server . -p 8123"`);
