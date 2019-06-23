import { isFunction } from './isFunction.js';

export const isPromise = arg => arg != null && isFunction(arg.then);
