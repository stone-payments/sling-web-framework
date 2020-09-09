import { storiesOf } from '@storybook/vue';
import { withKnobs, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import '../index.js';
import readMe from '../../README.md';

const logEvent = ({ type, detail }) => {
  action(type)(detail);
};

const casesOptions = {
  total: 20,
  selected: 1
};

function getCodeSample () {
  return function () {
    let attrs = '';
    attrs += this.total ? ` total="${this.total}"` : '';
    attrs += this.selected ? ` selected="${this.selected}"` : '';

    if (attrs.length > 20) {
      attrs = `${attrs.replace(/ /g, '\n  ')}\n`;
    }

    return `<emd-paginator${attrs}></emd-paginator>`;
  };
}

storiesOf('Paginator', module)
  .addDecorator(withKnobs)
  .add('Arrows and numbers', () => ({
    methods: {
      logEvent
    },
    template: `
      <div class="story">
        <div class="component">
          <emd-paginator
            :total="total"
            :selected="selected"
            @paginate="logEvent">
          </emd-paginator>
        </div>
        <div class="codesample">
          <pre>{{ codesample }}</pre>
        </div>
      </div>
    `,
    props: {
      total: {
        default: number('total', 20, casesOptions)
      },
      selected: {
        default: number('selected', 1, casesOptions)
      }
    },
    computed: {
      codesample: getCodeSample(),
      fullWidthStyle () {
        return this.useFullWidth ? 'width: 100%' : '';
      }
    }
  }), {
    notes: { markdown: readMe }
  })
  .add('Arrows only', () => ({
    methods: {
      logEvent
    },
    template: `
      <div class="story">
        <div class="component">
          <emd-paginator
            @paginate="logEvent">
          </emd-paginator>
        </div>
        <div class="codesample">
          <pre>{{ codesample }}</pre>
        </div>
      </div>
    `,
    computed: {
      codesample: getCodeSample(),
      fullWidthStyle () {
        return this.useFullWidth ? 'width: 100%' : '';
      }
    }
  }), {
    notes: { markdown: readMe }
  });
