import { domHelper } from '../node_modules/sling-web-helpers/src/index.js';
import { ScLogin } from './component/Login.js';

domHelper.registerComponent('sling-login', ScLogin);
