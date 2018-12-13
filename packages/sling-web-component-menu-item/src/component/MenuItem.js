import { html, SlingElement } from 'sling-framework';
import 'sling-web-component-icon';

export class MenuItem extends SlingElement {

  static get properties() {
    return {
      aim: {
        type: String,
        reflectToAttribute: true,
      },
      size: {
        type: String,
        reflectToAttribute: true,
      },
      menu: {
        type: String,
        reflectToAttribute: true,
      },
    };
  }

  render() {
    const menuSize = this.parentElement.getAttribute('size');
    const childrens = Array.from(this.children).map($el => $el.nodeName);
    const hasMenu = childrens.includes('SLING-MENU');

    return !hasMenu ? html`
      <style>
        @import url('sling-web-component-menu-item/src/index.css');
      </style>
      <a href="http://google.com">
        <sling-icon icon="${this.aim || 'info'}" className="${menuSize}"></sling-icon>
        <slot></slot>
      </a>
    ` : html`
      <style>
        @import url('sling-web-component-menu-item/src/index.css');
      </style>
      <a href="http://google.com">
        <sling-icon icon="${this.aim || 'info'}" className="${menuSize}"></sling-icon>
        <slot name="title"></slot>
      </a>
      <slot></slot>
    `;
  }
}
