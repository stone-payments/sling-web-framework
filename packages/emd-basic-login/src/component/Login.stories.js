import { storiesOf } from '@storybook/vue';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import readMe from '../../README.md';
import '../index.js';

const fontOptions = {
  range: true,
  min: 12,
  max: 24,
  step: 1
};

const logEvent = ({ type, detail, target }) => {
  action(type)(detail);

  if (!type.startsWith('forgot') && target.nextStep) {
    setTimeout(target.nextStep.bind(target), 650);
  }
};

storiesOf('Login', module)
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
        default: text('Title', 'Acesse Sua Conta')
      }
    },
    template: `
      <div
        class="story"
        :style="{ fontSize: fontSize + 'px' }"
      >
        <div class="component">
          <emd-login
            @forgotemail="logEvent"
            @forgotpassword="logEvent"
            @emailsubmitsuccess="logEvent"
            @passwordsubmitsuccess="logEvent"
            @keydown.stop=""
          >
            {{ text }}
          </emd-login>
        </div>
        <div class="codesample">
          <pre>{{ codesample }}</pre>
        </div>
      </div>
    `,
    computed: {
      codesample () {
        return `<emd-login>
  ${this.text}
</emd-login>`;
      }
    }
  }), {
    notes: { markdown: readMe }
  })
  .add('With Password', () => ({
    methods: {
      logEvent
    },
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      text: {
        default: text('Title', 'Acesse Sua Conta')
      }
    },
    template: `
      <div
        class="story"
        :style="{ fontSize: fontSize + 'px' }"
      >
        <div class="component">
          <emd-login
            :style="{ fontSize: fontSize + 'px' }"
            email="user@stone.com.br"
            step="2"
            @forgotemail="logEvent"
            @forgotpassword="logEvent"
            @emailsubmitsuccess="logEvent"
            @passwordsubmitsuccess="logEvent"
            @keydown.stop=""
          >
            {{ text }}
          </emd-login>
        </div>
        <div class="codesample">
          <pre>{{ codesample }}</pre>
        </div>
      </div>
    `,
    computed: {
      codesample () {
        return `<emd-login step="2" email="user@stone.com.br">
  ${this.text}
</emd-login>`;
      }
    }
  }), {
    notes: { markdown: readMe }
  });
