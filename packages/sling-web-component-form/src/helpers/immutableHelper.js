import { setIn as timmSetIn, getIn as timmGetIn } from 'timm';

export { mergeDeep } from 'timm';

export const toPath = str => str
  .replace(/\]$/g, '')
  .replace(/(\[|\])/g, '.')
  .replace(/\.{2,}/g, '.')
  .split('.')
  .map(key => (!Number.isNaN(Number(key)) ? Number(key) : key));

export const setIn = (obj, path, value) => {
  const normalizedPath = toPath(path);
  return timmSetIn(obj, normalizedPath, value);
};

export const getIn = (obj, path) => {
  const normalizedPath = toPath(path);
  return timmGetIn(obj, normalizedPath);
};
