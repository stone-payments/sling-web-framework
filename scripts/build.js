const { rollup } = require('rollup');
const { transform } = require('babel-core');
const { readFile, ensureFile, writeFile, copy, pathExists } =
  require('fs-extra');

const globAsyncMap = require('./globAsyncMap.js');
const replaceNodeDependencyPaths = require('./replaceNodeDependencyPaths.js');
const replaceCssImportsForTheirContents =
  require('./replaceCssImportsForTheirContents.js');

const buildConfig = require('../build.config.js');
const rollupConfig = require('../rollup.config.js');

const { NODE_ENV, BABEL_ENV, BUILD_TYPE } = process.env;
const devPackage = process.argv[2];

if (!NODE_ENV) {
  throw new Error('NODE_ENV must be provided.');
}

if (!BABEL_ENV) {
  throw new Error('BABEL_ENV must be provided.');
}

if (BUILD_TYPE === 'dev' && !devPackage) {
  throw new Error('A source package must be provided. ' +
    'Run "npm build-dev package-name".');
}

let globPattern = [];
const globOptions = { onlyFiles: true };
const bundlePaths = (buildConfig || {}).bundled || [];
const buildDistribution = BABEL_ENV.split('-')[1];
const buildType = BUILD_TYPE || 'dist';

if (buildType === 'dev') {
  globPattern = `./packages/${devPackage}/index.js`;
} else if (buildType === 'dist' && buildDistribution === 'bundle') {
  globPattern = bundlePaths
    .map(folderName => `./packages/${folderName}/src/index.js`);
} else if (buildType === 'dist' && buildDistribution === 'package') {
  globPattern = [
    './packages/*/src/**/*.js',
    '!./packages/*/src/**/*.test.js',
    ...bundlePaths.map(folderName => `!./packages/${folderName}`),
  ];
}

const safeCopy = async (srcPath, destPath) => {
  if (await pathExists(srcPath)) {
    await ensureFile(destPath);
    await copy(srcPath, destPath);
  }
};

console.log(`Building ${NODE_ENV.toUpperCase()} ${buildDistribution}s.`);

try {
  globAsyncMap(globPattern, globOptions, async (path) => {
    let processedCode;
    let savePath;
    let basePath;

    if (buildType === 'dev') {
      savePath = path.replace(devPackage, `${devPackage}/${buildType}`);
      [basePath] = path.split('/index.js');
    } else if (buildType === 'dist') {
      savePath = path.replace('src', `${buildType}/${NODE_ENV}`);
      [basePath] = path.split('/src/');
    }

    if (buildType === 'dev') {
      const htmlPath = path.replace('.js', '.html');
      const htmlSavePath = savePath.replace('.js', '.html');
      await safeCopy(htmlPath, htmlSavePath);

      const cssPath = path.replace('.js', '.css');
      const cssSavePath = savePath.replace('.js', '.css');
      await safeCopy(cssPath, cssSavePath);
    }

    if (buildDistribution === 'bundle') {
      const rollupOptions = {
        configInput: path,
        configOutput: savePath,
      };

      const config = rollupConfig(rollupOptions);

      const inputOptions = {
        input: config.input,
        plugins: config.plugins,
      };

      const outputOptions = config.output;
      const bundle = await rollup(inputOptions);
      const { code } = await bundle.generate(outputOptions);

      processedCode = await replaceCssImportsForTheirContents(code, basePath);
    } else if (buildDistribution === 'package') {
      const code = await readFile(path, 'utf8');
      const babelRc = await readFile('.babelrc', 'utf8');
      const babelConfig = JSON.parse(babelRc).env[BABEL_ENV];

      const codeWithReplaces = await replaceCssImportsForTheirContents(
        replaceNodeDependencyPaths(code), basePath);

      const transformed = transform(codeWithReplaces, babelConfig);

      processedCode = transformed.code;
    }

    await ensureFile(savePath);
    await writeFile(savePath, processedCode);
  });
} catch (err) {
  console.log('An error occurred while building ' +
    `${NODE_ENV.toUpperCase()} ${buildDistribution}s.`);
  console.warn(err);
}
