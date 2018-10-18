import { SlingElement, html } from 'sling-framework';

class StarRating extends SlingElement {
  constructor() {
    super();
    this.rate = 0;
    this.handleStarClick = this.handleStarClick.bind(this);
  }

  static get properties() {
    return {
      rate: {
        type: Number,
        reflectToAttribute: true,
        observer(newRate) {
          this.restrictRate(newRate);
          this.dispatchEventAndMethod('rate', newRate);
        },
      },
    };
  }

  restrictRate(newRate, oldRate) {
    if (Math.round(newRate) !== newRate || newRate < 0 || newRate > 5) {
      this.rate = Math.round(Math.max(0, Math.min(5, newRate)));
    }
  }

  handleStarClick(index) {
    return () => {
      this.rate = index;
    };
  }

  render() {
    return html`
      <style>
        button { color: grey; border: none; font-size: 32px; }
        button.selected { color: gold; }
      </style>
      ${[1, 2, 3, 4, 5].map(index => html`
        <button
          className="${index <= this.rate ? ' selected' : ''}"
          onclick=${this.handleStarClick(index)}>★</button>
      `)}
    `;
  }
}

window.customElements.define('star-rating', StarRating);
