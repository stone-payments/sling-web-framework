import { getIn as timmGetIn } from 'timm';
import { toPath } from './toPath.js';

export const getIn = (obj, path) => {
  const normalizedPath = toPath(path);
  return timmGetIn(obj, normalizedPath);
};
