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

function getCodeSample ({ useLegacy }) {
  return function () {
    let attrs = '';
    attrs += !useLegacy ? ' abc' : '';
    attrs += this.disabled ? ' disabled' : '';
    attrs += this.loading ? ' loading' : '';
    attrs += this.size ? ` size="${this.size}"` : '';
    attrs += this.rank ? ` rank="${this.rank}"` : '';
    attrs += this.type ? ` type="${this.type}"` : '';
    attrs += this.href ? ` href="${this.href}"` : '';
    attrs += this.target ? ` target="${this.target}"` : '';

    if (attrs.length > 40) {
      attrs = `${attrs.replace(/ /g, '\n  ')}\n`;
    }

    const iconStr = this.icon
      ? `<emd-icon
    slot="icon"
    icon="${this.icon}"
  ></emd-icon>\n  `
      : '';

    let styles;

    const hasCustomStyle = this.borderRadius ||
      this.padding ||
      this.color ||
      this.backgroundColor ||
      this.borderColor ||
      this.disabledColor ||
      this.disabledBackgroundColor ||
      this.disabledBorderColor;

    styles = hasCustomStyle ? `<style>
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

    styles = this.useFullWidth ? `<style>
  emd-button { width: 100%; }
</style>

` : '';

    return `${styles}<emd-button${attrs}>
  ${iconStr}${this.text}
</emd-button>`;
  };
}

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('ABC Default', () => ({
    template: `
      <div class="story">
        <div class="component">
          <emd-button abc
            :size="size"
            :rank="rank"
            :type="type"
            :loading="loading"
            :disabled="disabled"
            :style="fullWidthStyle"
          >
            {{ text }}
          </emd-button>
        </div>
        <div class="codesample">
          <pre>{{ codesample }}</pre>
        </div>
      </div>
    `,
    props: {
      text: {
        default: text('Content', 'Click me')
      },
      size: {
        default: select('Size', ['large', 'medium', 'small'], 'large')
      },
      rank: {
        default: select('Rank', ['primary', 'secondary', 'tertiary'], 'primary')
      },
      type: {
        default: select('Type', ['button', 'submit', 'reset'], 'button')
      },
      disabled: {
        default: boolean('Disabled', false)
      },
      loading: {
        default: boolean('Loading', false)
      },
      useFullWidth: {
        default: boolean('Full width', false)
      }
    },
    computed: {
      codesample: getCodeSample({ useLegacy: false }),
      fullWidthStyle () {
        return this.useFullWidth ? 'width: 100%' : '';
      }
    }
  }), {
    notes: { markdown: readMe }
  })
  .add('With Icon', () => ({
    template: `
      <div class="story">
        <div class="component">
        <emd-button abc
          :size="size"
          :rank="rank"
          :type="type"
          :loading="loading"
          :disabled="disabled"
          :style="fullWidthStyle"
        >
            <emd-icon slot="icon" icon="edit">
            </emd-icon>
            {{ processedText }}
          </emd-button>
        </div>
        <div class="codesample">
          <pre>{{ codesample }}</pre>
        </div>
      </div>
    `,
    props: {
      text: {
        default: text('Content', 'Edit')
      },
      size: {
        default: select('Size', ['large', 'medium', 'small'], 'large')
      },
      rank: {
        default: select('Rank', ['primary', 'secondary', 'tertiary'], 'primary')
      },
      type: {
        default: select('Type', ['button', 'submit', 'reset'], 'button')
      },
      disabled: {
        default: boolean('Disabled', false)
      },
      loading: {
        default: boolean('Loading', false)
      },
      useFullWidth: {
        default: boolean('Full width', false)
      },
      hideText: {
        default: boolean('Icon only', false)
      },
      icon: {
        default: 'edit'
      }
    },
    computed: {
      codesample: getCodeSample({ useLegacy: false }),
      fullWidthStyle () {
        return this.useFullWidth ? 'width: 100%' : '';
      },
      processedText () {
        return this.hideText ? '' : this.text;
      }
    }
  }), {
    notes: { markdown: readMe }
  })
  .add('With Link', () => ({
    methods: {
      logEvent
    },
    props: {
      href: {
        default: text('Href', 'http://stone.co')
      },
      target: {
        default: text('Target', '_blank')
      }
    },
    template: `
      <div class="story">
        <div class="component" @keydown.stop="">
          <emd-button
            abc
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
      codesample: getCodeSample({ useLegacy: false })
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
    template: `
      <div class="story">
        <div
          class="component"
          style="display: grid; grid-gap: 1em; grid-template-columns: 1fr 1fr; align-items: center; max-width: 37.5em;"
        >
          <emd-button abc
            @click="addCountSlow"
          >
            Single click
          </emd-button>
          <p>
            Click count: {{ slow }}
          </p>
          <emd-button abc
            @click="addCountFast"
            multipleclicks
          >
            Multiple clicks
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
        return `<emd-button abc>
  Single click
</emd-button>

<emd-button abc multipleclicks>
  Multiple clicks
</emd-button>`;
      }
    }
  }), {
    notes: { markdown: readMe }
  })
  .add('Legacy', () => ({
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
        default: boolean('Disabled', false)
      },
      loading: {
        default: boolean('Loading', false)
      }
    },
    template: `
      <div class="story" :style="{ fontSize: fontSize + 'px' }">
        <div class="component" @keydown.stop="">
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
      codesample: getCodeSample(({ useLegacy: true }))
    }
  }), {
    notes: { markdown: readMe }
  })
  .add('Legacy With Custom Style', () => ({
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
        default: boolean('Disabled', false)
      },
      loading: {
        default: boolean('Loading', false)
      }
    },
    computed: {
      codesample: getCodeSample({ useLegacy: true }),
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
        <div class="component" @keydown.stop="">
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
  });
