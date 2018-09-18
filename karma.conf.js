const { resolve } = require('path');
const webpackTestConfig = require('./webpack.test.config');
const getBasePath = require('./scripts/helpers/getBasePath');

const basePath = getBasePath();
const allPackagesPath = './packages/*';

let reports = {
  reporters: ['mocha'],
  mochaReporter: {
    showDiff: true,
  },
};

if (basePath === allPackagesPath) {
  reports = {
    ...reports,
    reporters: [...reports.reporters, 'coverage-istanbul'],
    coverageIstanbulReporter: {
      dir: resolve(__dirname, './coverage/integration'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
    },
  };
}

module.exports = (config) => {
  config.set({
    ...reports,
    webpack: webpackTestConfig(),
    browsers: [
      'ChromeHeadlessNoSandbox',
      'FirefoxHeadless',
    ],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
      },
    },
    browserNoActivityTimeout: 60000,
    singleRun: true,
    frameworks: ['mocha', 'chai-sinon'],
    urlRoot: 'test',
    proxies: {
      '/test/': '/test/base/packages/',
    },
    files: [
      {
        pattern: `${allPackagesPath}/src/**/*.css`,
        watched: true,
        served: true,
      },
      {
        pattern: `${basePath}/src/**/*.test.js`,
        watched: false,
      },
    ],
    preprocessors: {
      [`${basePath}/src/**/*.test.js`]: ['webpack'],
    },
  });
};
