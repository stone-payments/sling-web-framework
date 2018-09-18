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

const scope = getScope();
console.log(`Building ${scope !== '*' ? scope : 'all packages'}\n`);

forEachPackage(scope, (pkg) => {
  (async () => {
    console.log(`Started:\n${pkg}\n`);

    let context;

    // Outputs `dist/es/es6/` and `dist/es/es5/` from `src/`

    context = await getJsPathsExceptTests(`${pkg}/src`);

    await Promise.all(context.map((path) => {
      const es6Path = path.replace('/src/', '/dist/es/es6/');
      const es5Path = path.replace('/src/', '/dist/es/es5/');

      return readFile(path, 'utf8')
        .then(injectCssContent)
        .then(safeWriteFile(es6Path))
        .then(transformEs6ToEs5)
        .then(safeWriteFile(es5Path));
    }));

    // Outputs `dist/cjs/es6/` and `dist/cjs/es5/` from `dist/es/es6`

    context = await getJsPathsExceptTests(`${pkg}/dist/es/es6`);

    await Promise.all(context.map((path) => {
      const es6Path = path.replace('/dist/es/es6/', '/dist/cjs/es6/');
      const es5Path = path.replace('/dist/es/es6/', '/dist/cjs/es5/');

      return readFile(path, 'utf8')
        .then(transformImportToCjs)
        .then(safeWriteFile(es6Path))
        .then(transformEs6ToEs5)
        .then(safeWriteFile(es5Path));
    }));

    // Outputs `dist/iife/es6/` and `dist/iife/es5/` from `dist/es/es6/index.js`

    context = [`${pkg}/dist/es/es6/index.js`];

    await Promise.all(context.map((path) => {
      const es6Path = path.replace('/dist/es/es6/', '/dist/iife/es6/');
      const es5Path = path.replace('/dist/es/es6/', '/dist/iife/es5/');
      const packageName = getPackageName(pkg);

      return Promise.resolve(path)
        .then(bundleJsImports(packageName))
        .then(safeWriteFile(es6Path))
        .then(transformEs6ToEs5)
        .then(safeWriteFile(es5Path));
    }));

    console.log(`Finished:\n${pkg}\n`);
  })();
});
