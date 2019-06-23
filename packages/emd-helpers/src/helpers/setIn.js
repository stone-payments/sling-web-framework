import { setIn as timmSetIn } from 'timm';
import { toPath } from './toPath.js';

export const setIn = (obj, path, value) => {
  const normalizedPath = toPath(path);
  return timmSetIn(obj, normalizedPath, value);
};
