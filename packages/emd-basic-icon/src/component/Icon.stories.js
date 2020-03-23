import { storiesOf } from '@storybook/vue';
import { withKnobs, number, color, boolean } from '@storybook/addon-knobs';
import readMe from '../../README.md';
import '../index.js';

const fontOptions = {
  range: true,
  min: 12,
  max: 24,
  step: 1
};

const Icon = customElements.get('emd-icon');

const iconNames = Object
  .keys(Icon.icons)
  .map(key => key.toLowerCase().replace(/_/g, '-'))
  .sort();

function getCodeSample (iconName, color) {
  return `<emd-icon
  icon="${iconName}"${color ? `
  style="color: ${color}"` : ''}
></emd-icon>`;
}

const template = `
<div
  class="story"
  :style="{ fontSize: fontSize + 'px' }"
>
  <div class="icongrid">
    <div v-for="iconName in iconNames" :key="iconName">
      <emd-icon :icon="iconName" :style="{ color }"></emd-icon>
      <div v-if="showCodeSamples" class="inlinecodesample">
        <pre>{{ getCodeSample(iconName, color) }}</pre>
      </div>
    </div>
  </div>
</div>
`;

storiesOf('Icon', module)
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
  })
  .add('With Custom Style', () => ({
    data () {
      return {
        iconNames
      };
    },
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      color: {
        default: color('Color', 'black')
      },
      showCodeSamples: {
        default: boolean('Show code samples', true)
      }
    },
    methods: {
      getCodeSample
    },
    template
  }), {
    notes: { markdown: readMe }
  });
