const { ensureFile, writeFile } = require('fs-extra');

module.exports = path => async (fileAsString) => {
  await ensureFile(path);
  await writeFile(path, fileAsString);
  return fileAsString;
};
