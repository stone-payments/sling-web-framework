const { exec, env } = require('shelljs');
const { join } = require('path');
const opn = require('opn');

const getScope = require('./helpers/getScope');

const scope = getScope();

console.log('Starting server\n');

const httpServer = join('node_modules/.bin/http-server');

env.PKG = scope;
env.BASE = 'http://127.0.0.1:8321/packages';

const url = `${env.BASE}/${scope !== '*' ? `${scope}/public` : ''}`;

exec(`${httpServer} -p 8321`, { async: true });

setTimeout(() => opn(url), 500);
