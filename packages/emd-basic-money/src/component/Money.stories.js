import { storiesOf } from '@storybook/vue';
import { withKnobs, number, select, boolean, color } from '@storybook/addon-knobs';
import readMe from '../../README.md';
import '../index.js';

const fontOptions = {
  range: true,
  min: 12,
  max: 24,
  step: 1
};

const opacityOptions = {
  range: true,
  min: 0,
  max: 1,
  step: 0.1
};

function getCustomStyle () {
  return {
    'font-size': `${this.fontSize}px`,
    '--emd-money-positive-color': this.positiveColor,
    '--emd-money-neutral-color': this.neutralColor,
    '--emd-money-negative-color': this.negativeColor,
    '--emd-money-effect-color': this.effectColor,
    '--emd-money-effect-opacity': this.effectOpacity
  };
}

function getCodeSampleArgs (forcedValue) {
  const value = this.value || forcedValue;

  let args = '';

  args += value != null ? `\n  value="${value}"` : '';

  args += this.currency != null && this.currency !== 'none'
    ? `\n  currency="${this.currency}"`
    : '';

  args += this.showPositiveSign === false ? '\n  hidepositivesign' : '';
  args += this.showValue === false ? '\n  hidevalue' : '';

  return args;
}

function getCodeSample () {
  const hasCustomStyle = this.positiveColor ||
    this.neutralColor ||
    this.negativeColor ||
    this.effectColor ||
    this.effectOpacity;

  const styleList = Object.entries(getCustomStyle.apply(this))
    .map(([key, value]) => value ? `\n    ${key}: ${value};` : undefined)
    .filter(result => result != null)
    .join('');

  const styles = `<style>
  emd-money {${styleList}
  }
</style>\n\n`;

  const boundGetCodeSampleArgs = getCodeSampleArgs.bind(this);

  return `${hasCustomStyle ? styles : ''}${this.value
    ? `<emd-money${boundGetCodeSampleArgs()}
></emd-money>`
    : `<emd-money${boundGetCodeSampleArgs(1250)}
></emd-money>

<emd-money${boundGetCodeSampleArgs(0)}
></emd-money>

<emd-money${boundGetCodeSampleArgs(-1250)}
></emd-money>`}`;
}

storiesOf('Money', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      value: {
        default: number('Value', 1250)
      },
      currency: {
        default: select('Currency', ['none', 'BRL', 'USD', 'EUR'], 'BRL')
      },
      showPositiveSign: {
        default: boolean('Show positive sign', true)
      },
      showValue: {
        default: boolean('Show value', true)
      }
    },
    template: `
      <div
        class="story"
        :style="{ fontSize: fontSize + 'px' }"
      >
        <div class="component">
          <emd-money
            :value="value"
            :currency="currency"
            :hidevalue="!showValue"
            :hidepositivesign="!showPositiveSign"
            style="display: block;"
          >
          </emd-money>
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
  })
  .add('With Custom Style', () => ({
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      currency: {
        default: select('Currency', ['none', 'BRL', 'USD', 'EUR'], 'BRL')
      },
      positiveColor: {
        default: color('Positive color', '#14AA4B')
      },
      neutralColor: {
        default: color('Neutral color', '#8B8B8B')
      },
      negativeColor: {
        default: color('Negative color', '#E74C3C')
      },
      showPositiveSign: {
        default: boolean('Show positive sign', true)
      },
      showValue: {
        default: boolean('Show value', true)
      }
    },
    template: `
      <div
        class="story"
        :style="customStyle"
      >
        <div class="component">
          <emd-money
            value="1250"
            :currency="currency"
            :hidevalue="!showValue"
            :hidepositivesign="!showPositiveSign"
            style="display: block; margin-bottom: 1em;"
          >
          </emd-money>
          <emd-money
            value="0"
            :currency="currency"
            :hidevalue="!showValue"
            :hidepositivesign="!showPositiveSign"
            style="display: block; margin-bottom: 1em;"
          >
          </emd-money>
          <emd-money
            value="-1250"
            :currency="currency"
            :hidevalue="!showValue"
            :hidepositivesign="!showPositiveSign"
            style="display: block;"
          >
          </emd-money>
        </div>
        <div class="codesample">
          <pre>{{ codesample }}</pre>
        </div>
      </div>
    `,
    computed: {
      customStyle: getCustomStyle,
      codesample: getCodeSample
    }
  }), {
    notes: { markdown: readMe }
  })
  .add('With Hidden Value', () => ({
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      currency: {
        default: select('Currency', ['none', 'BRL', 'USD', 'EUR'], 'BRL')
      },
      effectColor: {
        default: color('Effect color', '#8B572A')
      },
      effectOpacity: {
        default: number('Effect opacity', 0.5, opacityOptions)
      },
      showValue: {
        default: boolean('Show value', false)
      }
    },
    template: `
      <div
        class="story"
        :style="customStyle"
      >
        <div class="component">
          <emd-money
            value="1250"
            :currency="currency"
            :hidevalue="!showValue"
            style="display: block; margin-bottom: 1em;"
          >
          </emd-money>
          <emd-money
            value="0"
            :currency="currency"
            :hidevalue="!showValue"
            style="display: block; margin-bottom: 1em;"
          >
          </emd-money>
          <emd-money
            value="-1250"
            :currency="currency"
            :hidevalue="!showValue"
            style="display: block;"
          >
          </emd-money>
        </div>
        <div class="codesample">
          <pre>{{ codesample }}</pre>
        </div>
      </div>
    `,
    computed: {
      customStyle: getCustomStyle,
      codesample: getCodeSample
    }
  }), {
    notes: { markdown: readMe }
  });
