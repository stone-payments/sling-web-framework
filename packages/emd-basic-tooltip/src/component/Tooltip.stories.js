import { storiesOf } from '@storybook/vue';
import { withKnobs, text, number, select, color, boolean } from '@storybook/addon-knobs';
import readMe from '../../README.md';
import '../index.js';

const fontOptions = {
  range: true,
  min: 12,
  max: 24,
  step: 1
};

const borderRadiusOptions = {
  range: true,
  min: 0,
  max: 24,
  step: 2
};

const delayOptions = {
  range: true,
  min: 0,
  max: 900,
  step: 180
};

function getCodeSample () {
  const hasCustomStyle = this.tooltipFontSize ||
    this.tooltipTextAlign ||
    this.tooltipBorderRadius ||
    this.width ||
    this.padding ||
    this.textColor ||
    this.backgroundColor ||
    this.borderColor;

  const styles = hasCustomStyle ? `<style>
  emd-tooltip {
    --emd-tooltip-font-size: ${this.tooltipFontSize};
    --emd-tooltip-text-align: ${this.tooltipTextAlign};
    --emd-tooltip-border-radius: ${this.tooltipBorderRadius}px;
    --emd-tooltip-width: ${this.width};
    --emd-tooltip-padding: ${this.padding};
    --emd-tooltip-text-color: ${this.textColor};
    --emd-tooltip-background-color: ${this.backgroundColor};
    --emd-tooltip-border-color: ${this.borderColor};
  }
</style>

` : '';

  const position = this.position ? `\n  position="${this.position}"` : '';
  const delay = this.delay ? `\n  delay="${this.delay}"` : '';
  const shadow = this.shadow ? '\n  shadow' : '';

  return `${styles}<span id="target">
  Hover me
</span>

<emd-tooltip
  for="target"${position}${delay}${shadow}
>
  ${this.text}
</emd-tooltip>`;
}

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      text: {
        default: text('Content', 'This is a tooltip')
      },
      position: {
        default: select('Position', ['top', 'bottom', 'left', 'right'], 'right')
      },
      delay: {
        default: number('Delay (ms)', 0, delayOptions)
      },
      shadow: {
        default: boolean('Shadow', false)
      }
    },
    template: `
      <div class="story" :style="{ fontSize: fontSize + 'px' }">
        <div class="component" @keydown.stop="" style="text-align: center;">
          <h2 id="title" style="display: inline-block; margin: 4em auto;">
            Hover me
          </h2>
          <emd-tooltip
            for="title"
            :position="position"
            :delay="delay"
            :shadow.prop="shadow"
          >
            {{ text }}
          </emd-tooltip>
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
  .add('With Custom Styles', () => ({
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      tooltipFontSize: {
        default: text('Tooltip font size (px)', '14px')
      },
      tooltipTextAlign: {
        default: select('Tooltip text alignment',
          ['left', 'center', 'right'], 'center')
      },
      tooltipBorderRadius: {
        default: number('Border radius (px)', 6, borderRadiusOptions)
      },
      text: {
        default: text('Content', 'This is a tooltip with custom style')
      },
      width: {
        default: text('Width', '90px')
      },
      padding: {
        default: text('Padding', '1em')
      },
      textColor: {
        default: color('Text color', '#576069')
      },
      backgroundColor: {
        default: color('Background color', '#fff')
      },
      borderColor: {
        default: color('Border color', '#14AA4B')
      },
      position: {
        default: select('Position',
          ['top', 'bottom', 'left', 'right'], 'bottom')
      },
      delay: {
        default: number('Delay (ms)', 360, delayOptions)
      },
      shadow: {
        default: boolean('Shadow', false)
      }
    },
    template: `
      <div class="story" :style="{ fontSize: fontSize + 'px' }">
        <div class="component" @keydown.stop="" style="text-align: center;">
          <h2 id="title" style="display: inline-block; margin: 4em auto;">
            Hover me
          </h2>
          <emd-tooltip
            for="title"
            :style="customStyle"
            :position="position"
            :delay="delay"
            :shadow.prop="shadow"
          >
            {{ text }}
          </emd-tooltip>
        </div>
        <div class="codesample">
          <pre>{{ codesample }}</pre>
        </div>
      </div>
    `,
    computed: {
      codesample: getCodeSample,
      customStyle () {
        return {
          '--emd-tooltip-font-size': this.tooltipFontSize,
          '--emd-tooltip-text-align': this.tooltipTextAlign,
          '--emd-tooltip-border-radius': `${this.tooltipBorderRadius}px`,
          '--emd-tooltip-width': this.width,
          '--emd-tooltip-padding': this.padding,
          '--emd-tooltip-text-color': this.textColor,
          '--emd-tooltip-background-color': this.backgroundColor,
          '--emd-tooltip-border-color': this.borderColor
        };
      }
    }
  }), {
    notes: { markdown: readMe }
  });
