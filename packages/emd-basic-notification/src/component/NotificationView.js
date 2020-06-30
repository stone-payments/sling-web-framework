import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-icon';
import '@stone-payments/emd-basic-button';

import { ALERT } from './svg/alert.js';
import { SUCCESS } from './svg/success.js';
import { DANGER } from './svg/danger.js';

const svgMap = {
  alert: ALERT,
  success: SUCCESS,
  danger: DANGER
};

export const NotificationView = ({
  view,
  mode = 'alert'
}) => {
  let wrapperClass = 'emd-notification__wrapper';
  wrapperClass += view ? ` is-${view}` : '';
  wrapperClass += mode ? ` is-${mode}` : '';

  return html`
    <style>
      @import url("emd-basic-notification/src/component/Notification.css");
    </style>
    <div part="wrapper" class="${wrapperClass}">
      ${svgMap[mode]}
      <slot></slot>
    </div>
  `;
};
