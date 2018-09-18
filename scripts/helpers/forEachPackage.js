const getPackages = require('./getPackages.js');

module.exports = (scope, callback) => getPackages(scope)
  .then((pkgs) => {
    pkgs.forEach(callback);
  });
