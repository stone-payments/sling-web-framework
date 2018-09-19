const { exec, env } = require('shelljs');
const { join } = require('path');

const getScope = require('./helpers/getScope');

const scope = getScope();
console.log(`Testing ${scope !== '*' ? scope : 'all packages'}\n`);

env.PKG_SCOPE = scope;
const { DEBUG } = process.env;

const karma = join('node_modules/.bin/karma');

exec(`${karma} start --colors` +
  `${DEBUG ? ' --browsers=Chrome,Firefox --single-run=false --auto-watch' : ''}`);
