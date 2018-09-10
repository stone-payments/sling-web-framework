const { readFile, pathExists } = require('fs-extra');
const stringReplaceAsync = require('string-replace-async');

const bundleCssImports = require('./bundleCssImports.js');

const replacer = basePath => async (match, cssPath, end) => {
  const fullCssPath = basePath ? `${basePath}/${cssPath}` : cssPath;

  if (pathExists(fullCssPath)) {
    const cssFile = await readFile(fullCssPath, 'utf8');
    const cssBundle = await bundleCssImports(cssFile, fullCssPath);
    return `${cssBundle.replace('`', '\\`')}${end}`;
  }

  return match;
};

const replaceCssImportsForTheirContents = async (fileAsString, basePath) =>
  stringReplaceAsync(fileAsString, /@import.*(?:"|')(.*?)(?:"|').*?;?(<|$)/gm,
    replacer(basePath));

module.exports = replaceCssImportsForTheirContents;
