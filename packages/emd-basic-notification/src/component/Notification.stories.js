import { storiesOf } from '@storybook/vue';
import { withKnobs, number, select, text, boolean } from '@storybook/addon-knobs';
import readMe from '../../README.md';
import chunk from 'chunk-text';
import '../index.js';

const fontOptions = {
  range: true,
  min: 12,
  max: 24,
  step: 1
};

const smartEllipsis = (str, max) => {
  const [chunked] = chunk(str, max);

  const chunkedWithoutPunctuation = /[.,;]/g.test(chunked.slice(-1))
    ? chunked.slice(0, -1)
    : chunked;

  return chunked.length >= str.length
    ? str
    : `${chunkedWithoutPunctuation}…`;
};

function getCodeSample () {
  let attrs = '';
  attrs += this.mode ? ` mode="${this.mode}"` : '';
  attrs += this.view !== 'default' ? ` view="${this.view}"` : '';
  return `<emd-notification${attrs}>
  ${smartEllipsis(this.content, 45)}${this.showAction ? `
  <button slot="action">Action<button>` : ''}
</emd-notification>`;
}

const getTemplate = () => `
  <div class="story" :style="{ fontSize: fontSize + 'px' }">
    <template v-if="view === 'compact'">
      <div class="component" @keydown.stop="">
        <emd-notification :mode="mode" :view="view">
          {{content}}
          <button
            v-if="showAction"
            slot="action"
            :style="{ fontSize: fontSize + 'px' }"
          >
            Action
          </button>
        </emd-notification>
      </div>
      <div class="codesample">
        <pre>{{ codesample }}</pre>
      </div>
    </template>
    <template v-if="view !== 'compact'">
      <div class="component" @keydown.stop="" style="grid-column-end: span 2">
        <emd-notification :mode="mode" :view="view">
          {{content}}
          <button
            v-if="showAction"
            slot="action"
            :style="{ fontSize: fontSize + 'px' }"
          >
            Action
          </button>
        </emd-notification>
      </div>
      <div class="codesample" style="grid-column: auto">
        <pre>{{ codesample }}</pre>
      </div>
    </template>
  </div>
`;

const CUSTOM_STYLE = `emd-notification::part(wrapper) {
  background: #fff;
  border-width: 1px 1px 1px 10px;
  border-style: solid;
  border-radius: 4px 10px 10px 4px;
  padding: 30px;
}

emd-notification::part(icon) {
  display: block;
  width: 44px;
  margin-right: 44px;
  fill: currentColor;
}`;

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  'nisi ut aliquip ex ea commodo consequat.';

function mountCustomStyle (id) {
  const parsedId = `custom-style-${id}`;
  let styleTag = document.getElementById(parsedId);

  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.id = parsedId;
    styleTag.appendChild(document.createTextNode(''));
    document.head.appendChild(styleTag);
  }

  this.styleNode = styleTag.childNodes[0];
}

function destroyCustomStyle (id) {
  const parsedId = `custom-style-${id}`;
  const styleTag = document.getElementById(parsedId);

  if (styleTag) {
    document.head.removeChild(styleTag);
  }
}

storiesOf('Notification', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      mode: {
        default: select('Mode', ['alert', 'success', 'danger'], 'alert')
      },
      view: {
        default: 'default'
      },
      content: {
        default: text('Content', LOREM)
      },
      showAction: {
        default: boolean('Show action', false)
      }
    },
    template: getTemplate(),
    computed: {
      codesample: getCodeSample
    }
  }), {
    notes: { markdown: readMe }
  })
  .add('Compact', () => ({
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      mode: {
        default: select('Mode', ['alert', 'success', 'danger'], 'alert')
      },
      view: {
        default: 'compact'
      },
      content: {
        default: text('Content', LOREM)
      },
      showAction: {
        default: boolean('Show action', false)
      }
    },
    template: getTemplate(),
    computed: {
      codesample: getCodeSample
    }
  }), {
    notes: { markdown: readMe }
  })
  .add('With Custom Style', () => ({
    mounted () {
      this.mountCustomStyle('emd-notification');
    },
    destroyed () {
      this.destroyCustomStyle('emd-notification');
    },
    methods: {
      mountCustomStyle,
      destroyCustomStyle
    },
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      mode: {
        default: select('Mode', ['alert', 'success', 'danger'], 'alert')
      },
      view: {
        default: 'default'
      },
      content: {
        default: text('Content', LOREM)
      },
      customStyle: {
        default: text('Custom Style', CUSTOM_STYLE)
      },
      showAction: {
        default: boolean('Show action', false)
      }
    },
    template: getTemplate(),
    computed: {
      codesample: getCodeSample
    },
    watch: {
      customStyle (val) {
        this.styleNode.textContent = val;
      }
    }
  }), {
    notes: { markdown: readMe }
  });
