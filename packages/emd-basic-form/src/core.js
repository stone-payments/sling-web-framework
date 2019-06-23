import { compose } from '@stone-payments/emd-helpers';
import { withComponent, withForm } from '@stone-payments/emd-hocs';
import { LitElement } from '@stone-payments/lit-element';

import { FormController } from './component/FormController.js';
import { FormView } from './component/FormView.js';

const Form = compose(
  FormController,
  withForm,
  withComponent
)(LitElement);

Form.views = FormView;

export {
  Form,
  FormController,
  FormView
};
