import { storiesOf } from '@storybook/vue';
import { withKnobs, number, boolean, select, text } from '@storybook/addon-knobs';
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
  attrs += this.valueAttr ? `\n  value="${this.valueAttr}"` : '';
  attrs += this.forceUppercase ? '\n  forceuppercase' : '';
  return `<emd-pin-code${attrs}\n></emd-pin-code>`;
}

const getTemplate = ({ hasCustomValue }) => `
  <div class="story" :style="{ fontSize: fontSize + 'px' }">
    <div class="component" @keydown.stop="">
      ${hasCustomValue ? `
        <emd-pin-code
          :type="type"
          :cases="cases"
          :forceuppercase.prop="forceUppercase"
          @input="logEvent"
          @complete="logEvent"
          :value="valueAttr"
        ></emd-pin-code>
      ` : `
        <emd-pin-code
          :type="type"
          :cases="cases"
          :forceuppercase.prop="forceUppercase"
          @input="logEvent"
          @complete="logEvent"
        ></emd-pin-code>
      `}
      <div style="margin-top: 16px">
        <button @click="focusPinCode">Focus</button>
        <button @click="blurPinCode">Blur</button>
      </div>
    </div>
    <div class="codesample">
      <pre>{{ codesample }}</pre>
    </div>
  </div>
`;

export const CUSTOM_STYLE = `emd-pin-code::part(wrapper) {
  display: grid;
  grid-column-gap: 0.5em;
}

emd-pin-code::part(case) {
  -webkit-appearance: none;
  background: #FFFFFF;
  color: inherit;
  border: 2px solid #D6DDE4;
  border-radius: 5px;
  font-family: inherit;
  font-style: normal;
  font-weight: bold;
  font-size: 1em;
  text-align: center;
  padding: 0.3125em 0.25em;
  width: 1em;
}`;

function mountCustomStyle (id) {
  const parsedId = `custom-style-${id}`;
  let styleTag = document.getElementById(parsedId);

  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.id = parsedId;
    styleTag.appendChild(document.createTextNode(''));
    document.head.appendChild(styleTag);
  }

  this.styleNode = styleTag.childNodes[0];
}

function destroyCustomStyle (id) {
  const parsedId = `custom-style-${id}`;
  const styleTag = document.getElementById(parsedId);

  if (styleTag) {
    document.head.removeChild(styleTag);
  }
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
      forceUppercase: {
        default: boolean('Force Uppercase', false)
      }
    },
    template: getTemplate({ hasCustomValue: false }),
    computed: {
      codesample: getCodeSample
    }
  }), {
    notes: { markdown: readMe }
  })
  .add('With Custom Style', () => ({
    mounted () {
      this.mountCustomStyle('pin-code');
    },
    destroyed () {
      this.destroyCustomStyle('pin-code');
    },
    methods: {
      logEvent,
      focusPinCode,
      blurPinCode,
      mountCustomStyle,
      destroyCustomStyle
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
      forceUppercase: {
        default: boolean('Force Uppercase', false)
      },
      customStyle: {
        default: text('Custom Style', CUSTOM_STYLE)
      }
    },
    template: getTemplate({ hasCustomValue: false }),
    computed: {
      codesample: getCodeSample
    },
    watch: {
      customStyle (val) {
        this.styleNode.textContent = val;
      }
    }
  }), {
    notes: { markdown: readMe }
  })
  .add('With Initial Value', () => ({
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
      forceUppercase: {
        default: boolean('Force Uppercase', false)
      },
      valueAttr: {
        default: 'abc'
      }
    },
    template: getTemplate({ hasCustomValue: true }),
    computed: {
      codesample: getCodeSample
    }
  }), {
    notes: { markdown: readMe }
  });
