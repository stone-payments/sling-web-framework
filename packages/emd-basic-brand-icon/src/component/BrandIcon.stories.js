import { storiesOf } from '@storybook/vue';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import readMe from '../../README.md';
import '../index.js';

const fontOptions = {
  range: true,
  min: 12,
  max: 24,
  step: 1
};

const iconNames = [
  'Alelo',
  'AmericanExpress',
  'Banescard',
  'Ben',
  'Cabal',
  'Cooper Card',
  'Elo',
  'GreenCard',
  'Hipercard',
  'MasterCard',
  'Senff',
  'Sodexo',
  'Sorocred',
  'Ticket',
  'UnionPay',
  'UP Brasil',
  'ValeCard',
  'VerdeCard',
  'VeroCard',
  'Visa',
  'VR Benefícios'
];

function getCodeSample (iconName, color) {
  return `<emd-brand-icon
  icon="${iconName}"
></emd-brand-icon>`;
}

const template = `
<div
  class="story"
  :style="{ fontSize: fontSize + 'px' }"
>
  <div class="icongrid">
    <div v-for="iconName in iconNames" :key="iconName">
      <emd-brand-icon :icon="iconName" :style="{ color }"></emd-brand-icon>
      <div v-if="showCodeSamples" class="inlinecodesample">
        <pre>{{ getCodeSample(iconName, color) }}</pre>
      </div>
    </div>
  </div>
</div>
`;

storiesOf('Brand Icon', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    data () {
      return {
        iconNames
      };
    },
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      showCodeSamples: {
        default: boolean('Show code samples', true)
      },
      color: null
    },
    methods: {
      getCodeSample
    },
    template
  }), {
    notes: { markdown: readMe }
  });
