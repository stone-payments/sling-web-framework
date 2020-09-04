import { isFunction, createRangeArray } from '@stone-payments/emd-helpers';

export const CASES = 7;
const isPositiveIntegerStartingAt = (start, value) =>
  typeof value === 'number' && value >= start && value === Math.round(value);

export const PaginatorController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.getRange = this.getRange.bind(this);
      this.isFirstSelected = this.isFirstSelected.bind(this);
      this.isLastSelected = this.isLastSelected.bind(this);
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
          reflectToAttribute: true,
          observer: 'updateTotal'
        },
        selected: {
          type: Number,
          reflectToAttribute: true,
          observer: 'updateSelected'
        }
      };
    }

    isTotalValid () {
      return isPositiveIntegerStartingAt(1, this.total);
    }

    isSelectedValid () {
      return isPositiveIntegerStartingAt(0, this.selected);
    }

    isSelectedValidOrNull () {
      return this.selected == null || this.isSelectedValid();
    }

    isSelectedInRange () {
      return this.selected >= 1 && this.selected <= this.total;
    }

    isFirstSelected () {
      return this.isSelectedValid() && this.selected === 1;
    }

    isLastSelected () {
      return this.isSelectedValid() && this.selected === this.total;
    }

    putSelectedInRange () {
      if (this.selected < 1) {
        this.selected = 1;
      }

      if (this.selected > this.total) {
        this.selected = this.total;
      }
    }

    changeSelected (type, index) {
      if (type === 'previous') {
        this.selected -= 1;
      } else if (type === 'next') {
        this.selected += 1;
      } else {
        this.selected = index;
      }
    }

    removeSelected () {
      this.removeAttribute('selected');
      this.selected = undefined;
    }

    removeTotal () {
      this.removeAttribute('total');
      this.total = undefined;
    }

    updateSelected () {
      if (this.isSelectedValidOrNull() && this.isTotalValid()) {
        if (!this.isSelectedInRange()) {
          this.putSelectedInRange();
        } else {
          this.dispatchEventAndMethod('paginate', {
            type: 'index',
            index: this.selected
          });
        }
      } else {
        this.removeSelected();
      }
    }

    updateTotal () {
      if (this.isTotalValid()) {
        if (!this.isSelectedValid()) {
          this.changeSelected('index', 1);
        }
      } else {
        this.removeTotal();
        this.removeSelected();
      }
    }

    paginate (type, index) {
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

    getRange () {
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
