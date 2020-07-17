import { compose } from '@stone-payments/emd-helpers';
import { withComponent } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { LoginController } from './component/LoginController.js';
import { LoginView } from './component/LoginView.js';

const Login = compose(
  LoginController,
  withComponent
)(LitElement);

Login.views = LoginView;

export {
  Login,
  LoginController,
  LoginView
};
