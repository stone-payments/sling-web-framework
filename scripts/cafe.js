const { exec, env } = require('shelljs');
const { join } = require('path');

const getScope = require('./helpers/getScope');
const getBasePath = require('./helpers/getBasePath');

const scope = getScope();
console.log(`Testing ${scope !== '*' ? scope : 'all packages'}\n`);

const basePath = getBasePath(scope);

env.PKG = scope;
env.BASE = 'http://127.0.0.1:8123/packages';

const testCafe = join('node_modules/.bin/testcafe');
const testFiles = join(basePath, 'src/**/*.cafe.js');

exec('npm run build && ' +
  `${testCafe} firefox ${testFiles} --app "http-server . -p 8123"`);
