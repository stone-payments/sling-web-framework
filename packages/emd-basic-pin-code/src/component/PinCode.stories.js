import { storiesOf } from '@storybook/vue';
import { withKnobs, number, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import readMe from '../../README.md';
import '../index.js';

const fontOptions = {
  range: true,
  min: 12,
  max: 24,
  step: 1
};

const casesOptions = {
  range: true,
  min: 3,
  max: 9,
  step: 1
};

const logEvent = ({ type, detail }) => {
  action(type)(detail);
};

const focusPinCode = () => {
  document.querySelector('emd-pin-code').focus();
};

const blurPinCode = () => {
  document.querySelector('emd-pin-code').blur();
};

function getCodeSample () {
  let attrs = '';
  attrs += this.cases ? `\n  cases="${this.cases}"` : '';
  attrs += this.type ? `\n  type="${this.type}"` : '';
  attrs += this.value ? `\n  value="${this.value}"` : '';
  attrs += this.forceuppercase ? '\n  forceuppercase' : '';
  return `<emd-pin-code${attrs}
></emd-pin-code>`;
}

storiesOf('Pin Code', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    methods: {
      logEvent,
      focusPinCode,
      blurPinCode
    },
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      cases: {
        default: number('Cases', 6, casesOptions)
      },
      type: {
        default: select('Type', ['text', 'number', 'password'], 'text')
      },
      forceuppercase: {
        default: boolean('Force Uppercase')
      }
    },
    template: `
      <div class="story" :style="{ fontSize: fontSize + 'px' }">
        <div class="component" @keydown.stop="">
          <emd-pin-code
            :type="type"
            :cases="cases"
            :forceuppercase.prop="forceuppercase"
            @input="logEvent"
            @complete="logEvent"
          ></emd-pin-code>
          <p>
            <button @click="focusPinCode">Focus</button>
            <button @click="blurPinCode">Blur</button>
          </p>
        </div>
        <div class="codesample">
          <pre>{{ codesample }}</pre>
        </div>
      </div>
    `,
    computed: {
      codesample: getCodeSample
    }
  }), {
    notes: { markdown: readMe }
  });
