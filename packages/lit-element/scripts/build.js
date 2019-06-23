const build = require('@stone-payments/emd-cli/cli/scripts/build/index.js');

const hooks = {
  beforeWriteFile ({ type, outputDir }) {
    return fileAsString => {
      if (type === 'es/es6') {
        return fileAsString
          .replace(/('|")lit-html/gm, '$1@stone-payments/lit-html')
          .replace(/lit-html\//gm, `lit-html/${outputDir}/${type}/`);
      }
      return fileAsString;
    };
  }
};

build({
  root: process.env.EMD_LIT_ROOT || false,
  scope: process.env.EMD_LIT_SCOPE || false,
  inputDir: 'node_modules/lit-element',
  deploy: true,
  allowGitIgnored: true,
  hooks
});
