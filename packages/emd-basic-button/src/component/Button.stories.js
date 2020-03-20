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

const borderRadiusOptions = {
  range: true,
  min: 0,
  max: 24,
  step: 2
};

const logEvent = ({ type, detail }) => {
  action(type)(detail);
};

function getCodeSample () {
  let attrs = '';
  attrs += this.type ? ` type="${this.type}"` : '';
  attrs += this.disabled ? ' disabled' : '';
  attrs += this.loading ? ' loading' : '';
  attrs += this.href ? ` href="${this.href}"` : '';
  attrs += this.target ? ` target="${this.target}"` : '';

  const hasCustomStyle = this.borderRadius ||
    this.padding ||
    this.color ||
    this.backgroundColor ||
    this.borderColor ||
    this.disabledColor ||
    this.disabledBackgroundColor ||
    this.disabledBorderColor;

  const styles = hasCustomStyle ? `<style>
  emd-button {
    font-size: ${this.fontSize}px;
    border-radius: ${this.borderRadius}px;
    --emd-button-padding: ${this.padding};
    color: ${this.color};
    background-color: ${this.backgroundColor};
    border-color: ${this.borderColor};
  }

  emd-button[disabled] {
    color: ${this.disabledColor};
    background-color: ${this.disabledBackgroundColor};
    border-color: ${this.disabledBorderColor};
  }
</style>

` : '';

  return `${styles}<emd-button${attrs}>
  ${this.text}
</emd-button>`;
}

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    methods: {
      logEvent
    },
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
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
      <div class="story" :style="{ fontSize: fontSize + 'px' }">
        <div class="component">
          <emd-button
            :type="type"
            :disabled.prop="disabled"
            :loading.prop="loading"
            @click="logEvent"
          >
            {{ text }}
          </emd-button>
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
    methods: {
      logEvent
    },
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      borderRadius: {
        default: number('Border radius (px)', 10, borderRadiusOptions)
      },
      padding: {
        default: text('Padding', '1em 4em')
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
        default: color('Disabled bg color', '#c3c8d2')
      },
      disabledBorderColor: {
        default: color('Disabled border color', '#c3c8d2')
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
    computed: {
      codesample: getCodeSample,
      customStyle () {
        return !this.disabled
          ? {
            color: this.color,
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderRadius: this.borderRadius + 'px',
            '--emd-button-padding': this.padding
          }
          : {
            color: this.disabledColor,
            backgroundColor: this.disabledBackgroundColor,
            borderColor: this.disabledBorderColor,
            borderRadius: this.borderRadius + 'px',
            '--emd-button-padding': this.padding
          };
      }
    },
    template: `
      <div
        class="story"
        :style="{ fontSize: fontSize + 'px' }"
      >
        <div class="component">
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
        <div class="codesample">
          <pre>{{ codesample }}</pre>
        </div>
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
        default: number('Font size (px)', 16, fontOptions)
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
        class="story"
        :style="{ fontSize: fontSize + 'px' }"
      >
        <div class="component">
          <emd-button
            :href="href"
            :target="target"
            @click="logEvent"
          >
            {{ text }}
          </emd-button>
        </div>
        <div class="codesample">
          <pre>{{ codesample }}</pre>
        </div>
      </div>
    `,
    computed: {
      text () {
        return `Go to ${this.href}`;
      },
      codesample: getCodeSample
    }
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
        default: number('Font size (px)', 16, fontOptions)
      }
    },
    template: `
      <div
        class="story"
        :style="{ fontSize: fontSize + 'px' }"
      >
        <div
          class="component"
          style="display: grid; grid-gap: 1em; grid-template-columns: 1fr 1fr; align-items: center; max-width: 37.5em;"
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
        <div class="codesample">
          <pre>{{ codesample }}</pre>
        </div>
      </div>
    `,
    computed: {
      codesample () {
        return `<emd-button>
  Multiple clicks (disabled)
</emd-button>

<emd-button multipleclicks>
  Multiple clicks (enabled)
</emd-button>`;
      }
    }
  }), {
    notes: { markdown: readMe }
  });
