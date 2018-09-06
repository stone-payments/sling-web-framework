const postcss = require('postcss');
const atImport = require('postcss-import');

const bundleCssImports = (fileAsString, filePath) =>
  postcss()
    .use(atImport())
    .process(fileAsString, {
      from: filePath,
    })
    .then(result => result.css)
    .catch((err) => {
      console.log('An error occurred while bundling ' +
        `css imports in ${filePath}`);
      console.warn(err);

      return fileAsString;
    });

module.exports = bundleCssImports;
