const build = require('@stone-payments/emd-cli/cli/scripts/build/index.js');

build({
  root: process.env.EMD_LIT_ROOT || false,
  scope: process.env.EMD_LIT_SCOPE || false,
  inputDir: 'node_modules/lit-html',
  deploy: true,
  allowGitIgnored: true
});
