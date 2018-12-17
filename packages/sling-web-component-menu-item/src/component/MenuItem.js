import { html, SlingElement } from 'sling-framework';
import 'sling-web-component-icon';

export class MenuItem extends SlingElement {
  static get properties() {
    return {
      icon: {
        type: String,
        reflectToAttribute: true,
      },
      href: {
        type: String,
        reflectToAttribute: true,
      },
      active: {
        type: String,
        reflectToAttribute: true,
      },
    };
  }

  render() {
    // Get attributes from parent sling-menu
    const menuSize = this.parentElement.getAttribute('size') || '';
    const layoutType = this.parentElement.getAttribute('layout') || '';

    // Get item atributes values
    const itemIsActive = (this.getAttribute('active') != null) ? 'active' : '';
    const itemAnchor = this.getAttribute('href');

    // Verify if has a sub-menu
    const itemChildrenElements = Array.from(this.children);
    const itemChildrenTags = itemChildrenElements.map($el => $el.tagName);

    const submenuPosition = itemChildrenTags.indexOf('SLING-MENU');
    const hasSubmenu = (submenuPosition !== -1);
    
    if (hasSubmenu) {
      // If so, propagates the layout attribute
      const submenuElement = itemChildrenElements[submenuPosition];
      submenuElement.setAttribute('layout', layoutType);
    }

    // Validations
    if (this.parentElement.tagName !== 'SLING-MENU') {
      throw new Error(
        'A sling-menu-item must be child of a sling-menu element');
    }

    if (itemAnchor === null && !hasSubmenu) {
      throw new Error(
        'All sling-menu-item whitout' +
        'a submenu must have a href attribute defined');
    }

    // Render
    return (itemAnchor && !hasSubmenu) ? html`
      <style>
        @import url('sling-web-component-menu-item/src/index.css');
      </style>
        ${this.icon ? html`
          <a href="${itemAnchor}" className="${layoutType} ${menuSize} ${itemIsActive} hasIcon">
            <sling-icon icon="${this.icon}" className="${menuSize}"></sling-icon>
            <slot></slot>
          </a>
        ` : html`
          <a href="${itemAnchor}" className="${layoutType} ${menuSize} ${itemIsActive}">
            <slot></slot>
          </a>
        `}
    ` : html`
      <style>
        @import url('sling-web-component-menu-item/src/index.css');
      </style>
        ${this.icon ? html`
          <a className="${layoutType} ${menuSize} ${itemIsActive} hasIcon">
            <sling-icon icon="${this.icon || 'info'}" className="${menuSize}"></sling-icon>
            <slot name="title"></slot>
          </a>
          <slot></slot>
        ` : html`
          <a className="${layoutType} ${menuSize} ${itemIsActive}">
            <slot name="title"></slot>
          </a>
          <slot></slot>
        `}
    `;
  }
}
