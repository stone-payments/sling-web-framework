import { setAttr } from 'sling-helpers';

export const FieldMessage = Base => class extends Base {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        @import url('sling-web-component-field-message/src/index.css');
      </style>
      <div></div>
    `;
  }

  get textElement() {
    return this.shadowRoot.querySelector('div');
  }

  get message() {
    return this.getAttribute('message');
  }

  set message(value) {
    setAttr(this, 'message', value);
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(value) {
    setAttr(this, 'name', value);
  }

  static get observedAttributes() {
    return ['message'];
  }

  attributeChangedCallback(attrName, previousValue, nextValue) {
    if (attrName === 'message' && previousValue !== nextValue) {
      this.textElement.innerHTML = nextValue;
    }
  }
};
