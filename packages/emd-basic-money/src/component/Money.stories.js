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

const getCustomStyle = (
  fontSize,
  positiveColor,
  neutralColor,
  negativeColor,
  effectColor,
  effectOpacity
) => ({
  fontSize: `${fontSize}px`,
  '--emd-money-positive-color': positiveColor,
  '--emd-money-neutral-color': neutralColor,
  '--emd-money-negative-color': negativeColor,
  '--emd-money-effect-color': effectColor,
  '--emd-money-effect-opacity': effectOpacity
});

storiesOf('Money', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    props: {
      fontSize: {
        default: number('Font size', 16, fontOptions)
      },
      value: {
        default: number('Value', 1250)
      },
      currency: {
        default: select('Currency', ['none', 'BRL', 'USD', 'EUR'], 'BRL')
      },
      showPositiveSign: {
        default: boolean('Show Positive Sign', true)
      },
      showValue: {
        default: boolean('Show Value', true)
      }
    },
    template: `
      <div :style="{ fontSize: fontSize + 'px' }">
        <emd-money
          :value="value"
          :currency="currency"
          :hidevalue="!showValue"
          :hidepositivesign="!showPositiveSign"
          style="display: block;"
        >
        </emd-money>
      </div>
    `
  }), {
    notes: { markdown: readMe }
  })
  .add('With Custom Style', () => ({
    methods: {
      getCustomStyle
    },
    props: {
      fontSize: {
        default: number('Font size', 16, fontOptions)
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
        default: boolean('Show Positive Sign', true)
      },
      showValue: {
        default: boolean('Show Value', true)
      }
    },
    template: `
      <div :style="getCustomStyle(fontSize, positiveColor, neutralColor, negativeColor, effectColor, effectOpacity)">
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
    `
  }), {
    notes: { markdown: readMe }
  })
  .add('With Hidden Value', () => ({
    methods: {
      getCustomStyle
    },
    props: {
      fontSize: {
        default: number('Font size', 16, fontOptions)
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
        default: boolean('Show Value', false)
      }
    },
    template: `
      <div :style="getCustomStyle(fontSize, positiveColor, neutralColor, negativeColor, effectColor, effectOpacity)">
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
    `
  }), {
    notes: { markdown: readMe }
  });
