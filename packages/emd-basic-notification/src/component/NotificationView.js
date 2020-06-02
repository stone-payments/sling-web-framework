import { html } from '@stone-payments/lit-element';
import '@stone-payments/emd-basic-icon';
import '@stone-payments/emd-basic-button';

export const NotificationView = ({
  text,
  icon,
  iconStyle,
  borderColor = '#fc0',
  backgroundColor = '#fff'
}) => html`
  <style>
    @import url("emd-basic-notification/src/component/Notification.css");
    .notification {
      border: ${`1px solid ${borderColor}`};
      border-left: ${`10px solid ${borderColor}`};
      background: ${backgroundColor};
    }
  </style>
  <div class="notification">
    ${
      icon && html`
        <emd-icon
          class="notification__icon"
          icon="${icon}"
          style="${iconStyle}"
        ></emd-icon>`
    }
    <p class="notification__text">${text}</p>
  </div>
`;
