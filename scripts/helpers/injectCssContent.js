const { readFile, pathExists } = require('fs-extra');
const stringReplaceAsync = require('string-replace-async');
const bundleCssImports = require('./bundleCssImports.js');

const replacer = async (match, cssPath, end) => {
  const fullCssPath = `./packages/${cssPath}`;

  try {
    if (pathExists(fullCssPath)) {
      const cssFile = await readFile(fullCssPath, 'utf8');
      const cssBundle = await bundleCssImports(fullCssPath)(cssFile);
      console.log(`Injected:\n${match}\n`);
      return `${cssBundle.replace('`', '\\`')}${end}`;
    }
  } catch (err) {
    console.log(`Failed to inject CSS in ${fullCssPath}.`);
    console.warn(err);
  }

  return match;
};

module.exports = fileAsString =>
  stringReplaceAsync(
    fileAsString,
    /@import.*?(?:["'])((?!\/\/)(?!https?:\/\/).*?)(?:[\\"']).*?;?(<|$)/gm,
    replacer,
  );
