import { html, SlingElement } from 'sling-framework';
import 'sling-web-component-icon';
import 'sling-web-component-button';

export class SnackBar extends SlingElement {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  static get properties() {
    return {
      layout: {
        type: String,
        reflectToAttribute: true,
      },
      aim: {
        type: String,
        reflectToAttribute: true,
      },
      size: {
        type: String,
        reflectToAttribute: true,
      },
      closeable: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  handleClick() {
    this.dispatchEventAndMethod('closeclick');
  }

  render() {
    const base = 'emd-snackbar';
    const attrNames = Object.keys(this.constructor.properties);
    const className = this.generateClassName(base, attrNames);

    return html`
      <style>
        .emd-snackbar {
  border: solid 1px transparent;
  border-radius: var(--sling-snackbar-border-radius, 2px);
  display: flex;
  align-items: center;
  padding: 0 15px;
  color: #fff;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
}

.emd-snackbar_closeable {
  padding-right: 0;
}

.emd-snackbar_list {
  flex-grow: 1;
  margin: 0 0 0 8px;
  list-style: none;
  padding: 15px 0;
}

.emd-snackbar_item {
  display: flex;
  align-items: center;
}

.emd-snackbar_layout_outline {
  border: solid 1px #C3C8D2;
  border-left: inherit;
  color: #2d3844;
}

.emd-snackbar_size_small {
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}

.emd-snackbar_size_big {
  font-size: 16px;
  line-height: 24px;
}

.emd-snackbar_icon,
.emd-snackbar_close {
  width: 24px;
}

.emd-snackbar_size_small .emd-snackbar_icon,
.emd-snackbar_size_small .emd-snackbar_close {
  width: 20px;
}

.emd-snackbar_size_big .emd-snackbar_icon,
.emd-snackbar_size_big .emd-snackbar_close {
  width: 28px;
}

.emd-snackbar_close {
  color: #ebebf0;
}

.emd-snackbar_close:hover,
.emd-snackbar_close:focus,
.emd-snackbar_close:active {
  color: #fff;
}

.emd-snackbar_layout_outline .emd-snackbar_close {
  color: #c3c8d2;
}

.emd-snackbar_layout_outline .emd-snackbar_close:hover,
.emd-snackbar_layout_outline .emd-snackbar_close:focus,
.emd-snackbar_layout_outline .emd-snackbar_close:active {
  color: #96a0af;
}

/* default */

.emd-snackbar {
  background: #8036dc;
}

.emd-snackbar_layout_outline {
  background: transparent;
  border-left: solid 3px #8036dc;
}

.emd-snackbar_layout_outline .emd-snackbar_icon {
  color: #8036dc;
}

/* danger */

.emd-snackbar_aim_danger {
  background: #e74c3c;
}

.emd-snackbar_layout_outline.emd-snackbar_aim_danger {
  background: transparent;
  border-left: solid 3px #e74c3c;
}

.emd-snackbar_layout_outline.emd-snackbar_aim_danger .emd-snackbar_icon {
  color: #e74c3c;
}

/* success */

.emd-snackbar_aim_success {
  background: #2ecc71;
}

.emd-snackbar_layout_outline.emd-snackbar_aim_success {
  background: transparent;
  border-left: solid 3px #2ecc71;
}

.emd-snackbar_layout_outline.emd-snackbar_aim_success .emd-snackbar_icon {
  color: #2ecc71;
}

/* alert */

.emd-snackbar_aim_warning {
  background: #f9bf09;
}

.emd-snackbar_layout_outline.emd-snackbar_aim_warning {
  background: transparent;
  border-left: solid 3px #f9bf09;
}

.emd-snackbar_layout_outline.emd-snackbar_aim_warning .emd-snackbar_icon {
  color: #f9bf09;
}

:host {
  display: block;
  background: none !important;
  height: auto !important;
}

:host slot {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}

::slotted(sling-button) {
  margin-top: -8px;
  margin-bottom: -8px;
  margin-left: 32px;
}

/* for compatibility */

sling-snackbar {
  display: block;
  background: none !important;
  height: auto !important;
}

sling-snackbar slot {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}

sling-snackbar sling-button {
  margin-top: -8px;
  margin-bottom: -8px;
  margin-left: 32px;
}

      </style>
      <div className="${className}">
        <sling-icon class="emd-snackbar_icon" icon="${this.aim || 'info'}"></sling-icon>
        <div class="emd-snackbar_list">
          <div class="emd-snackbar_item"><slot></slot></div>
        </div>
        ${this.closeable ? html`
          <sling-button layout="text" onclick="${this.handleClick}">
            <sling-icon class="emd-snackbar_close" icon="close"></sling-icon>
          </sling-button>
        ` : ''}
      </div>
    `;
  }
}
