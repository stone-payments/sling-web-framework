const { exec, env } = require('shelljs');

const getScope = require('./helpers/getScope');

const scope = getScope();
console.log(`Testing ${scope !== '*' ? scope : 'all packages'}\n`);

env.PKG_SCOPE = scope;
const { DEBUG } = process.env;

exec('./node_modules/.bin/karma start --colors' +
  `${DEBUG ? ' --browsers=Chrome,Firefox --single-run=false --auto-watch' : ''}`);
