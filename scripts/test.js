const { exec, env } = require('shelljs');
const { join } = require('path');

const getScope = require('./helpers/getScope');

const scope = getScope();
console.log(`Testing ${scope !== '*' ? scope : 'all packages'}\n`);

env.PKG = scope;
const { DEBUG } = process.env;

const karma = join('node_modules/.bin/karma');
const karmaConfig = join('scripts/config/karma.conf.js');

exec(`${karma} start ${karmaConfig} --colors` +
  `${DEBUG ? ' --browsers=Chrome --single-run=false --auto-watch' : ''}`);
