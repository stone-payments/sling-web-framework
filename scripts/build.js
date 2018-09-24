const { readFile } = require('fs-extra');

const getScope = require('./helpers/getScope');
const forEachPackage = require('./helpers/forEachPackage');
const getJsPathsExceptTests = require('./helpers/getJsPathsExceptTests');
const getPackageName = require('./helpers/getPackageName');
const bundleJsImports = require('./helpers/bundleJsImports');
const injectCssContent = require('./helpers/injectCssContent');
const transformImportToCjs = require('./helpers/transformImportToCjs');
const transformEs6ToEs5 = require('./helpers/transformEs6ToEs5');
const safeWriteFile = require('./helpers/safeWriteFile');

const { CI_ENV } = process.env;

const scope = getScope();
console.log(`Building ${scope !== '*' ? scope : 'all packages'} ` +
  `for ${CI_ENV ? 'DEPLOYMENT' : 'DEVELOPMENT'}\n`);

forEachPackage(scope, (pkg) => {
  (async () => {
    console.log(`Started:\n${pkg}\n`);

    let context;

    // Injects CSS in `src/` files (DEPLOYMENT only!)

    context = await getJsPathsExceptTests(`${pkg}/src`);

    if (CI_ENV) {
      await Promise.all(context.map(filePath => readFile(filePath, 'utf8')
        .then(injectCssContent)
        .then(safeWriteFile(filePath))));
    }

    // Outputs `dist/es/es6/` and `dist/es/es5/` from `src/`

    await Promise.all(context.map((filePath) => {
      const es6Path = filePath.replace('/src/', '/dist/es/es6/');
      const es5Path = filePath.replace('/src/', '/dist/es/es5/');

      return readFile(filePath, 'utf8')
        .then(injectCssContent)
        .then(safeWriteFile(es6Path))
        .then(transformEs6ToEs5)
        .then(safeWriteFile(es5Path));
    }));

    // Outputs `dist/cjs/es6/` and `dist/cjs/es5/` from `dist/es/es6/`

    context = await getJsPathsExceptTests(`${pkg}/dist/es/es6`);

    await Promise.all(context.map((filePath) => {
      const es6Path = filePath.replace('/dist/es/es6/', '/dist/cjs/es6/');
      const es5Path = filePath.replace('/dist/es/es6/', '/dist/cjs/es5/');

      return readFile(filePath, 'utf8')
        .then(transformImportToCjs)
        .then(safeWriteFile(es6Path))
        .then(transformEs6ToEs5)
        .then(safeWriteFile(es5Path));
    }));

    // Outputs `dist/iife/es6/` and `dist/iife/es5/` from `dist/es/es6/index.js`

    context = [`${pkg}/dist/es/es6/index.js`];

    await Promise.all(context.map((filePath) => {
      const es6Path = filePath.replace('/dist/es/es6/', '/dist/iife/es6/');
      const es5Path = filePath.replace('/dist/es/es6/', '/dist/iife/es5/');
      const packageName = getPackageName(pkg);

      return Promise.resolve(filePath)
        .then(bundleJsImports(packageName))
        .then(injectCssContent)
        .then(safeWriteFile(es6Path))
        .then(transformEs6ToEs5)
        .then(safeWriteFile(es5Path));
    }));

    console.log(`Finished:\n${pkg}\n`);
  })();
});
