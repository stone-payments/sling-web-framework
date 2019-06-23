export const toPath = str => {
  if (str === '') {
    return [];
  }

  let dotStr = str
    .replace(/\]$/g, '')
    .replace(/(\[|\])/g, '.')
    .replace(/\.{2,}/g, '.');

  if (dotStr[0] === '.') {
    dotStr = dotStr.slice(1);
  }

  return dotStr
    .split('.')
    .map(key => (!Number.isNaN(Number(key)) ? Number(key) : key));
};
