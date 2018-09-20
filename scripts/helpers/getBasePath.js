const { existsSync } = require('fs-extra');

module.exports = (scope = process.env.PKG || '*') => {
  const basePath = `./packages/${scope}`;

  if (scope !== '*' && !existsSync(basePath)) {
    throw new Error(`The package "${scope}" doesn't exist.`);
  }

  return `./packages/${scope}`;
};
