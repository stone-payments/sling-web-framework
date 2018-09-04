const browsersSync = require('browser-sync').create();
const { debounce } = require('lodash');
const { exec } = require('shelljs');

const devPackage = process.argv[2];

if (!devPackage) {
  throw new Error('A source package must be provided. ' +
    'Run "npm start package-name".');
}

let isBrowserReloading = false;

const onFileChange = () => {
  exec(`npm run build-dev ${devPackage}`);

  if (!isBrowserReloading) {
    isBrowserReloading = true;
    setTimeout(() => {
      browsersSync.reload();
      isBrowserReloading = false;
    });
  }
};

const debouncedOnFileChange = debounce(onFileChange, 2000, {
  leading: true,
});

browsersSync
  .watch('./packages/**/*.{js,html,css}', {
    ignored: /\/(node_modules|dev)\/|test.js$/,
    persistent: true,
  }, debouncedOnFileChange);

browsersSync
  .init({
    server: `./packages/${devPackage}/dev`,
  });
