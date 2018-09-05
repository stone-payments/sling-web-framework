import { onSdkAccessible } from './onSdkAccessible.js';

export const onSdkAvailable = callback => onSdkAccessible().then(callback);
