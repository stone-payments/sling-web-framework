import { storiesOf } from '@storybook/vue';
import { withKnobs, text, number, boolean, select, color } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import readMe from '../../README.md';
import '../index.js';

const fontOptions = {
  range: true,
  min: 12,
  max: 24,
  step: 1
};

const logEvent = ({ type, detail }) => {
  action(type)(detail);
};

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    methods: {
      logEvent
    },
    props: {
      fontSize: {
        default: number('Font size', 16, fontOptions)
      },
      text: {
        default: text('Content', 'Click me')
      },
      type: {
        default: select('Type', ['button', 'submit', 'reset'], 'button')
      },
      disabled: {
        default: boolean('Disabled')
      },
      loading: {
        default: boolean('Loading')
      }
    },
    template: `
      <div :style="{ fontSize: fontSize + 'px' }">
        <emd-button
          :type="type"
          :disabled.prop="disabled"
          :loading.prop="loading"
          @click="logEvent"
        >
          {{ text }}
        </emd-button>
      </div>
    `
  }), {
    notes: { markdown: readMe }
  })
  .add('With Custom Style', () => ({
    methods: {
      logEvent
    },
    props: {
      fontSize: {
        default: number('Font size', 16, fontOptions)
      },
      text: {
        default: text('Content', 'Click me')
      },
      padding: {
        default: text('Padding', '1em 4em')
      },
      borderRadius: {
        default: text('Border radius', '1em')
      },
      color: {
        default: color('Text color', '#fff')
      },
      backgroundColor: {
        default: color('Background color', '#088037')
      },
      borderColor: {
        default: color('Border color', '#088037')
      },
      disabledColor: {
        default: color('Disabled text color', '#fff')
      },
      disabledBackgroundColor: {
        default: color('Disabled background color', '#c3c8d2')
      },
      disabledBorderColor: {
        default: color('Disabled border color', '#c3c8d2')
      },
      type: {
        default: select('Type', ['button', 'submit', 'reset'], 'button')
      },
      disabled: {
        default: boolean('Disabled')
      },
      loading: {
        default: boolean('Loading')
      }
    },
    computed: {
      customStyle () {
        return !this.disabled
          ? {
            color: this.color,
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderRadius: this.borderRadius,
            '--emd-button-padding': this.padding
          }
          : {
            color: this.disabledColor,
            backgroundColor: this.disabledBackgroundColor,
            borderColor: this.disabledBorderColor,
            borderRadius: this.borderRadius,
            '--emd-button-padding': this.padding
          };
      }
    },
    template: `
      <div
        :style="{ fontSize: fontSize + 'px' }"
      >
        <emd-button
          :style="customStyle"
          :type="type"
          :disabled.prop="disabled"
          :loading.prop="loading"
          @click="logEvent"
        >
          {{ text }}
        </emd-button>
      </div>
    `
  }), {
    notes: { markdown: readMe }
  })
  .add('With Link', () => ({
    methods: {
      logEvent
    },
    props: {
      fontSize: {
        default: number('Font size', 16, fontOptions)
      },
      href: {
        default: text('Href', 'http://stone.co')
      },
      target: {
        default: text('Target', '_blank')
      }
    },
    template: `
      <div
        :style="{ fontSize: fontSize + 'px' }"
      >
        <emd-button
          :href="href"
          :target="target"
          @click="logEvent"
        >
          Go to {{ href }}
        </emd-button>
      </div>
    `
  }), {
    notes: { markdown: readMe }
  })
  .add('With Multiple Clicks', () => ({
    methods: {
      addCountFast (evt) {
        this.fast += 1;
        logEvent(evt);
      },
      addCountSlow (evt) {
        this.slow += 1;
        logEvent(evt);
      }
    },
    data () {
      return {
        fast: 0,
        slow: 0
      };
    },
    props: {
      fontSize: {
        default: number('Font size', 16, fontOptions)
      }
    },
    template: `
      <div
        style="display: grid; grid-gap: 1em; grid-template-columns: 1fr 1fr; align-items: center; max-width: 37.5em;"
        :style="{ fontSize: fontSize + 'px' }"
      >
        <emd-button
          @click="addCountSlow"
        >
          Multiple clicks (disabled)
        </emd-button>
        <p>
          Click count: {{ slow }}
        </p>
        <emd-button
          @click="addCountFast"
          multipleclicks
        >
          Multiple clicks (enabled)
        </emd-button>
        <p>
          Click count: {{ fast }}
        </p>
      </div>
    `
  }), {
    notes: { markdown: readMe }
  });
