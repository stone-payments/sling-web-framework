import { createRangeArray } from './helpers/createRangeArray.js';
import { isPositiveIntegerStartingAt } from './helpers/isPositiveIntegerStartingAt.js';

export const CASES = 7;

export const PaginatorController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.paginate = this.paginate.bind(this);
    }

    static get properties () {
      return {
        configuration: Object,
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
      return this.isSelectedValid && this.selected === 1;
    }

    get isLastSelected () {
      return this.isSelectedValid && this.selected === this.total;
    }

    get total () {
      return this._total;
    }

    set total (value) {
      if (isPositiveIntegerStartingAt(1, value)) {
        const oldValue = this.total;
        this._total = value;
        this.requestUpdate('total', oldValue);

        // force selected update
        const currentlySelected = this.selected;
        this.selected = currentlySelected;
      }
    }

    get selected () {
      return this._selected;
    }

    set selected (value) {
      if (isPositiveIntegerStartingAt(0, value)) {
        const oldValue = this.selected;
        this._selected = this.putSelectedInRange(value);
        this.requestUpdate('selected', oldValue);

        this.dispatchEventAndMethod('paginate', {
          type: 'index',
          index: this.selected
        });
      }
    }

    putSelectedInRange (value) {
      if (value < 1) {
        return 1;
      }

      return (value > this.total)
        ? this.total
        : value;
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
