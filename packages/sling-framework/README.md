# Sling Framework

The Sling Framework provides the building blocks to create Sling-based web components.

# Usage

```javascript
import { SlingElement, html } from 'sling-framework';

export const StarRating = (Base = class {}) => class extends Base {
  static get properties() {
    return {
      rate: {
        type: Number,
        reflectToAttribute: true,
      },
    };
  }

  render() {
    return html`
      <style>
        button { color: grey; border: none; font-size: 32px; }
        button.selected { color: gold; }
      </style>
      ${[1, 2, 3, 4, 5].map(index => html`
        <button className="${index <= this.rate ? ' selected' : ''}">★</button>
      `)}
    `;
  }
}

customElements.define('star-rating', StarRating(SlingElement));
```

More examples can be found at:
- [Creating a web component with SlingElement and html](https://github.com/stone-payments/sling-web-framework/wiki/Creating-a-web-component-with-SlingElement-and-html)
- [Creating a web component the makes API requests](https://github.com/stone-payments/sling-web-framework/wiki/Creating-a-web-component-the-makes-API-requests)

### SlingElement

A class based on Google's [LitElement](https://github.com/Polymer/lit-element) that provides attribute/property handling and reflecting.

### html

A tagged template literal utility from [lit-html](https://polymer.github.io/lit-html/) that provides an expressive API to dynamically generate html that reacts effectively to the component's state.

### withRequest

A decorator that exposes methods, properties and events for handling API requests.

### withSetState

A decorator that exposes a method that changes the component state in a functional way.
