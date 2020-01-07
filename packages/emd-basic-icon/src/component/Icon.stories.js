import { storiesOf } from '@storybook/vue';
import { withKnobs, number } from '@storybook/addon-knobs';
import readMe from '../../README.md';
import '../index.js';

const fontOptions = {
  range: true,
  min: 12,
  max: 24,
  step: 1
};

storiesOf('Icon', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    props: {
      fontSize: {
        default: number('Font size', 16, fontOptions)
      }
    },
    template: `
      <div
        class="story"
        :style="{ fontSize: fontSize + 'px' }"
      >
        <div class="autogrid">
          <emd-icon icon="close"></emd-icon>
        </div>
      </div>
    `
  }), {
    notes: { markdown: readMe }
  });
