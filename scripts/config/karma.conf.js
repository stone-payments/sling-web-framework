const { resolve } = require('path');
const webpackTestConfig = require('./webpack.test.config');
const getBasePath = require('../helpers/getBasePath');

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
      dir: resolve('./coverage/integration'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
    },
  };
}

const cssFiles = `${resolve(allPackagesPath)}/src/**/*.css`;
const testFiles = `${resolve(basePath)}/src/**/*.test.js`;

module.exports = (config) => {
  config.set({
    ...reports,
    webpack: webpackTestConfig(),
    browsers: [
      'ChromeHeadlessNoSandbox',
    ],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    browserNoActivityTimeout: 60000,
    singleRun: true,
    frameworks: ['mocha', 'chai-sinon'],
    urlRoot: 'root',
    proxies: {
      '/root/': '/root/base/packages/',
    },
    files: [
      {
        pattern: cssFiles,
        watched: true,
        served: true,
      },
      {
        pattern: testFiles,
        watched: false,
      },
    ],
    preprocessors: {
      [testFiles]: ['webpack'],
    },
  });
};
