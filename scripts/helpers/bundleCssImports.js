const postcss = require('postcss');
const atImport = require('postcss-import');

module.exports = filePath => fileAsString =>
  postcss()
    .use(atImport())
    .process(fileAsString, {
      from: filePath,
    })
    .then(result => result.css)
    .catch((err) => {
      console.log('An error occurred while bundling ' +
        `CSS imports at ${filePath}.`);
      console.warn(err);

      return fileAsString;
    });
