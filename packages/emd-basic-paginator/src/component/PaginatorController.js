import { createRangeArray } from './helpers/createRangeArray.js';

const isValidTotal = value => value == null ||
  (typeof value === 'number' && value === Math.round(value) && value > 0);

const isValidSelected = value => value == null ||
  (typeof value === 'number' && value === Math.round(value));

export const CASES = 7;

export const PaginatorController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.paginate = this.paginate.bind(this);
    }

    static get properties () {
      return {
        view: {
          type: String,
          reflect: true
        },
        total: {
          type: Number,
          reflect: true
        },
        selected: {
          type: Number,
          reflect: true
        }
      };
    }

    get isFirstSelected () {
      return this.total != null && this.selected === 1;
    }

    get isLastSelected () {
      return this.total != null && this.selected === this.total;
    }

    get total () {
      return this._total;
    }

    set total (value) {
      const oldValue = this.total;
      const nextValue = !isValidTotal(value) ? oldValue : value;

      this._total = nextValue;
      this._updateAttr('total', nextValue);
      this.requestUpdate('total', oldValue);

      // force selected update
      const currentlySelected = this.selected;
      this.selected = currentlySelected;
    }

    get selected () {
      return this._selected;
    }

    set selected (value) {
      const oldValue = this.selected;
      let nextValue;

      if (!isValidSelected(value)) {
        nextValue = oldValue;
      } else if (value == null) {
        nextValue = this.total == null ? undefined : 1;
      } else {
        nextValue = value > this.total
          ? this.total
          : value < 1 ? 1 : value;
      }

      this._selected = nextValue;
      this._updateAttr('selected', nextValue);

      if (this.total != null && nextValue != null && nextValue !== oldValue) {
        this.dispatchEventAndMethod('paginate', {
          type: 'index',
          index: nextValue
        });
      }

      this.requestUpdate('selected', oldValue);
    }

    _updateAttr (attrName, value) {
      if (value == null) {
        this.removeAttribute(attrName);
      } else {
        this.setAttribute(attrName, value);
      }
    }

    paginate (type, index) {
      return () => {
        if (this.total != null) {
          if (type === 'previous') {
            this.selected -= 1;
          } else if (type === 'next') {
            this.selected += 1;
          } else {
            this.selected = index;
          }
        } else {
          this.dispatchEventAndMethod('paginate', { type });
        }
      };
    }

    get currentRange () {
      const { total, selected = 1 } = this;
      const delta = CASES / 2;

      const shouldCollapse = (total > CASES);

      const shouldCollapseOnlyTheRight = shouldCollapse &&
        (selected >= 1 && selected <= 1 + delta);

      const shouldCollapseOnlyTheLeft = shouldCollapse &&
        !shouldCollapseOnlyTheRight &&
        (selected >= total - delta && selected <= total);

      const shouldCollapseOnBothSides = shouldCollapse &&
        !shouldCollapseOnlyTheRight &&
        !shouldCollapseOnlyTheLeft;

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

    render () {
      return this.currentView.use(this);
    }
  };
