import {
  DEFAULT_STYLE,
  DEFAULT_HEADER_STYLE,
  CELL_ONLY
} from '../constants/style.js';

export const TableController = (Base = class {}) =>
  class extends Base {
    constructor () {
      super();
      this.handleRowClick = this.handleRowClick.bind(this);
      this.dispatchCustomEvent = this.dispatchCustomEvent.bind(this);
      this.getHeaderAdapter = this.getHeaderAdapter.bind(this);
      this.stringifyHeaderStyle = this.stringifyHeaderStyle.bind(this);
      this.stringifyHeaderCellStyle = this.stringifyHeaderCellStyle.bind(this);
      this.getRowAdapter = this.getRowAdapter.bind(this);
      this.stringifyRowStyle = this.stringifyRowStyle.bind(this);
      this.stringifyRowCellStyle = this.stringifyRowCellStyle.bind(this);
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
        style: {
          type: Object,
          reflect: false
        },
        styles: {
          type: Object,
          reflect: false
        },
        usestyle: {
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
        headerstyle: {
          type: Object,
          reflect: false
        },
        clickablerows: {
          type: Boolean,
          reflect: true
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

    get style () {
      return this._style;
    }

    set style (value) {
      let pastStyle = this._style;
      this._style = value;
      this.styles = { default: this.style };
      this.usestyle = 'default';
      this.requestUpdate('style', pastStyle);
    }

    get adapter () {
      return this._adapter;
    }

    set adapter (value) {
      let pastAdapter = this._adapter;
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

    stringifyHeaderStyle (cellCount) {
      console.log('HEADER STYLE');
      const style = this.headerstyle;

      return this.constructor.stringifyExpandedStyle(
        this.constructor.expandStyle(style, DEFAULT_HEADER_STYLE, cellCount, {
          exclude: CELL_ONLY
        }),
        cellCount
      );
    }

    stringifyHeaderCellStyle (cellCount) {
      console.log('HEADER CELL STYLE');
      const style = this.headerstyle;

      return this.constructor.stringifyExpandedStyle(
        this.constructor.expandStyle(style, DEFAULT_HEADER_STYLE, cellCount, {
          only: CELL_ONLY
        }),
        cellCount
      );
    }

    static _getCurrent (row, rowIndex, subject, subjectKeyGetter) {
      let result;

      if (typeof subject === 'object') {
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
      let result = this.constructor._getCurrent(row, rowIndex,
        this.adapters, this.useadapter);

      if (result == null) {
        result = typeof row === 'object' && !Array.isArray(row)
          ? Object.values
          : arg => arg;
      }

      return result;
    }

    stringifyRowStyle (row, rowIndex, cellCount) {
      console.log('ROW STYLE');
      const style = this.constructor._getCurrent(row, rowIndex,
        this.styles, this.usestyle);

      return this.constructor.stringifyExpandedStyle(
        this.constructor.expandStyle(style, DEFAULT_STYLE, cellCount, {
          exclude: CELL_ONLY
        }),
        cellCount
      );
    }

    stringifyRowCellStyle (row, rowIndex, cellCount) {
      console.log('ROW CELL STYLE');
      const style = this.constructor._getCurrent(row, rowIndex,
        this.styles, this.usestyle);

      return this.constructor.stringifyExpandedStyle(
        this.constructor.expandStyle(style, DEFAULT_STYLE, cellCount, {
          only: CELL_ONLY
        }),
        cellCount
      );
    }

    handleRowClick (index) {
      return () => {
        if (this.clickablerows) {
          this.dispatchEventAndMethod('rowclick', this.rows[index]);
        }
      };
    }

    dispatchCustomEvent (index) {
      return evtName => () => {
        this.dispatchEventAndMethod(evtName, this.rows[index]);
      };
    }

    render () {
      return this.currentView.apply(this);
    }
  };
