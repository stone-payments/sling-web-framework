import { storiesOf } from '@storybook/vue';
import { withKnobs, number, text } from '@storybook/addon-knobs';
import readMe from '../../README.md';
import '../index.js';

const slideOptions = {
  range: true,
  min: 1,
  max: 4,
  step: 1
};

const delayOptions = {
  range: true,
  min: 0,
  max: 1200,
  step: 300
};

function getCodeSample () {
  let attrs = '';
  attrs += this.current ? ` current="${this.current}"` : '';
  attrs += this.delay ? ` delay="${this.delay}"` : '';

  const hasCustomStyle = this.gap;

  const styles = hasCustomStyle ? `<style>
  emd-slideshow {
    --emd-slideshow-gap: ${this.gap};
  }
</style>

` : '';

  return `${styles}<emd-slideshow${attrs}>
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
</emd-slideshow>`;
}

storiesOf('Slideshow', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    props: {
      current: {
        default: number('Current slide', 1, slideOptions)
      },
      delay: {
        default: number('Delay (ms)', 300, delayOptions)
      },
      gap: {
        default: text('Gap', '0px')
      }
    },
    template: `
      <div class="story" style="font-size: 7vw">
        <div class="component" @keydown.stop="">
          <emd-slideshow
            :current="current"
            :delay="delay"
            :style="{ '--emd-slideshow-gap': gap }"
          >
            <div style="background: #f4a589; text-align: center; padding: 1em 0;">One</div>
            <div style="background: #e4b599; text-align: center; padding: 1em 0;">Two</div>
            <div style="background: #d4c5a9; text-align: center; padding: 1em 0;">Three</div>
            <div style="background: #c4d5b9; text-align: center; padding: 1em 0;">Four</div>
          </emd-slideshow>
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
