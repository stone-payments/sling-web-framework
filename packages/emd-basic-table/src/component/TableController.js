import {
  DEFAULT_APPEARANCE,
  DEFAULT_HEADER_APPEARANCE,
  CELL_ONLY
} from '../constants/appearance.js';

export const TableController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.handleRowClick = this.handleRowClick.bind(this);
      this.dispatchCustomEvent = this.dispatchCustomEvent.bind(this);
      this.getHeaderAdapter = this.getHeaderAdapter.bind(this);
      this.stringifyHeaderAppearance =
        this.stringifyHeaderAppearance.bind(this);
      this.stringifyHeaderCellAppearance =
        this.stringifyHeaderCellAppearance.bind(this);
      this.getRowAdapter = this.getRowAdapter.bind(this);
      this.stringifyRowAppearance = this.stringifyRowAppearance.bind(this);
      this.stringifyRowCellAppearance =
        this.stringifyRowCellAppearance.bind(this);
      this.getRowClickability = this.getRowClickability.bind(this);
    }

    static get properties () {
      return {
        rows: {
          type: Array,
          reflect: false
        },
        adapter: {
          type: Function,
          reflect: false
        },
        adapters: {
          type: Object,
          reflect: false
        },
        useadapter: {
          type: Function,
          reflect: false
        },
        appearance: {
          type: Object,
          reflect: false
        },
        appearances: {
          type: Object,
          reflect: false
        },
        useappearance: {
          type: Function,
          reflect: false
        },
        titles: {
          type: Array,
          reflect: false
        },
        headeradapter: {
          type: Function,
          reflect: false
        },
        headerappearance: {
          type: Object,
          reflect: false
        },
        clickablerows: {
          type: Boolean,
          reflect: true
        },
        clickableadapter: {
          type: Function,
          reflect: false
        },
        expandedbody: {
          type: Boolean,
          reflect: true
        },
        view: {
          type: String,
          reflect: true
        }
      };
    }

    get appearance () {
      return this._appearance;
    }

    set appearance (value) {
      const pastAppearance = this._appearance;
      this._appearance = value;
      this.appearances = { default: this.appearance };
      this.useappearance = 'default';
      this.requestUpdate('appearance', pastAppearance);
    }

    get adapter () {
      return this._adapter;
    }

    set adapter (value) {
      const pastAdapter = this._adapter;
      this._adapter = value;
      this.adapters = { default: this.adapter };
      this.useadapter = 'default';
      this.requestUpdate('adapter', pastAdapter);
    }

    get wrappedTitles () {
      return this.titles != null
        ? [this.titles]
        : [];
    }

    getHeaderAdapter () {
      return this.headeradapter != null
        ? this.headeradapter
        : arg => arg;
    }

    stringifyHeaderAppearance (cellCount) {
      const appearance = this.headerappearance;

      return this.constructor.stringifyExpandedStyle(
        this.constructor.expandStyle(
          appearance,
          DEFAULT_HEADER_APPEARANCE,
          cellCount,
          { exclude: CELL_ONLY }
        ),
        cellCount
      );
    }

    stringifyHeaderCellAppearance (cellCount) {
      const appearance = this.headerappearance;

      return this.constructor.stringifyExpandedStyle(
        this.constructor.expandStyle(
          appearance,
          DEFAULT_HEADER_APPEARANCE,
          cellCount,
          { only: CELL_ONLY }
        ),
        cellCount
      );
    }

    static _getCurrent (row, rowIndex, subject, subjectKeyGetter) {
      let result;

      if (typeof subject === 'object' && !Array.isArray(subject)) {
        if (typeof subjectKeyGetter === 'function') {
          result = subject[subjectKeyGetter(row, rowIndex)];
        } else if (typeof subjectKeyGetter === 'string') {
          result = subject[subjectKeyGetter];
        } else {
          result = Object.values(subject)[0];
        }
      }

      return result;
    }

    getRowAdapter (row, rowIndex) {
      return this.constructor._getCurrent(row, rowIndex,
        this.adapters, this.useadapter) || Object.values;
    }

    stringifyRowAppearance (row, rowIndex, cellCount) {
      const appearance = this.constructor._getCurrent(row, rowIndex,
        this.appearances, this.useappearance);

      return this.constructor.stringifyExpandedStyle(
        this.constructor.expandStyle(
          appearance,
          DEFAULT_APPEARANCE,
          cellCount,
          { exclude: CELL_ONLY }
        ),
        cellCount
      );
    }

    stringifyRowCellAppearance (row, rowIndex, cellCount) {
      const appearance = this.constructor._getCurrent(row, rowIndex,
        this.appearances, this.useappearance);

      return this.constructor.stringifyExpandedStyle(
        this.constructor.expandStyle(
          appearance,
          DEFAULT_APPEARANCE,
          cellCount,
          { only: CELL_ONLY }
        ),
        cellCount
      );
    }

    getRowClickability (row, rowIndex) {
      if (!this.clickablerows) {
        return false;
      }

      if (typeof this.clickableadapter === 'function') {
        return this.clickableadapter(row, rowIndex);
      }

      return true;
    }

    handleRowClick (rowIndex) {
      return () => {
        const row = this.rows[rowIndex];
        if (this.getRowClickability(row, rowIndex)) {
          this.dispatchEventAndMethod('rowclick', row);
        }
      };
    }

    dispatchCustomEvent (rowIndex) {
      return evtName => () => {
        const row = this.rows[rowIndex];
        this.dispatchEventAndMethod(evtName, row);
      };
    }

    render () {
      return this.currentView.use(this);
    }
  };
