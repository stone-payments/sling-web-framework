import { SlingElement, html } from 'sling-framework';
import { isFunction, createRangeArray } from 'sling-helpers';

const isPositiveIntegerStartingAt = (start, value) =>
  typeof value === 'number' && value >= start && value === Math.round(value);

export const CASES = 7;

export class Paginator extends SlingElement {
  constructor() {
    super();
    this.paginate = this.paginate.bind(this);
  }

  static get properties() {
    return {
      configuration: Object,
      total: {
        type: Number,
        reflectToAttribute: true,
        observer: 'updateTotal',
      },
      selected: {
        type: Number,
        reflectToAttribute: true,
        observer: 'updateSelected',
      },
    };
  }

  isTotalValid() {
    return isPositiveIntegerStartingAt(1, this.total);
  }

  isSelectedValid() {
    return isPositiveIntegerStartingAt(0, this.selected);
  }

  isSelectedValidOrNull() {
    return this.selected == null || this.isSelectedValid();
  }

  isSelectedInRange() {
    return this.selected >= 1 && this.selected <= this.total;
  }

  isFirstSelected() {
    return this.isSelectedValid() && this.selected === 1;
  }

  isLastSelected() {
    return this.isSelectedValid() && this.selected === this.total;
  }

  putSelectedInRange() {
    if (this.selected < 1) {
      this.selected = 1;
    }

    if (this.selected > this.total) {
      this.selected = this.total;
    }
  }

  changeSelected(type, index) {
    if (type === 'previous') {
      this.selected -= 1;
    } else if (type === 'next') {
      this.selected += 1;
    } else {
      this.selected = index;
    }
  }

  removeSelected() {
    this.removeAttribute('selected');
    this.selected = undefined;
  }

  removeTotal() {
    this.removeAttribute('total');
    this.total = undefined;
  }

  updateSelected() {
    if (this.isSelectedValidOrNull() && this.isTotalValid()) {
      if (!this.isSelectedInRange()) {
        this.putSelectedInRange();
      } else {
        this.dispatchEventAndMethod('paginate', {
          type: 'index',
          index: this.selected,
        });
      }
    } else {
      this.removeSelected();
    }
  }

  updateTotal() {
    if (this.isTotalValid()) {
      if (!this.isSelectedValid()) {
        this.changeSelected('index', 1);
      }
    } else {
      this.removeTotal();
      this.removeSelected();
    }
  }

  paginate(type, index) {
    return () => {
      if (this.isTotalValid()) {
        this.changeSelected(type, index);
      } else {
        this.dispatchEventAndMethod('paginate', { type });

        // for compatibility
        const { paginate } = this.configuration || {};

        if (isFunction(paginate)) {
          paginate(type);
        }
      }
    };
  }

  getRange() {
    const { total, selected = 1 } = this;
    const delta = CASES / 2;

    const shouldCollapse = (total > CASES);

    const shouldCollapseOnlyTheRight = shouldCollapse
      && (selected >= 1 && selected <= 1 + delta);

    const shouldCollapseOnlyTheLeft = shouldCollapse
      && !shouldCollapseOnlyTheRight
      && (selected >= total - delta && selected <= total);

    const shouldCollapseOnBothSides = shouldCollapse
      && !shouldCollapseOnlyTheRight
      && !shouldCollapseOnlyTheLeft;

    let range;

    if (shouldCollapseOnlyTheRight) {
      range = [...createRangeArray(1, CASES - 2), null, total];
    } else if (shouldCollapseOnBothSides) {
      range = [1, null, ...createRangeArray(Math.floor(selected - delta) + 3,
        Math.floor(selected + delta) - 2), null, total];
    } else if (shouldCollapseOnlyTheLeft) {
      range = [1, null, ...createRangeArray((total - CASES) + 3, total)];
    } else {
      range = createRangeArray(1, total);
    }

    return range;
  }

  render() {
    const { total } = this;

    if (total != null && total === 1) {
      return html``;
    }

    return html`
      <style>
        @import url('sling-web-component-paginator/src/index.css');
      </style>
      <div class="emd-pag">
        <button
          onclick="${this.paginate('previous')}"
          disabled="${this.isFirstSelected()}"
          className="emd-pag__button ${this.isFirstSelected() ? 'emd-pag__button_disabled' : ''} emd-pag__button_type_arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
        ${(total > 1) ? this.getRange().map(label => (label != null ? html`
          <button
            onclick="${this.paginate('index', label)}"
            className="emd-pag__button ${label === this.selected ? 'emd-pag__button_selected' : ''} emd-pag__button_type_label">
            ${label}
          </button>
        ` : html`
          <span class="emd-pag__button emd-pag__button_type_ellipsis">...</span>
        `)) : ''}
        <button
          onclick="${this.paginate('next')}"
          disabled="${this.isLastSelected()}"
          className="emd-pag__button ${this.isLastSelected() ? 'emd-pag__button_disabled' : ''} emd-pag__button_type_arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </div>
    `;
  }
}
