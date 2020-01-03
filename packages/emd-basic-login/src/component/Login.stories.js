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
  .add('E-mail', () => ({
    methods: {
      logEvent
    },
    props: {
      fontSize: {
        default: number('Font size', 16, fontOptions)
      },
      text: {
        default: text('Title', 'Acesse Sua Conta')
      }
    },
    template: `
      <emd-login
        :style="{ fontSize: fontSize + 'px' }"
        @forgotemail="logEvent"
        @forgotpassword="logEvent"
        @emailsubmitsuccess="logEvent"
        @passwordsubmitsuccess="logEvent"
        @keydown.stop=""
      >
        {{ text }}
      </emd-login>
    `
  }), {
    notes: { markdown: readMe }
  })
  .add('Password', () => ({
    methods: {
      logEvent
    },
    props: {
      fontSize: {
        default: number('Font size', 16, fontOptions)
      },
      text: {
        default: text('Title', 'Acesse Sua Conta')
      }
    },
    template: `
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
    `
  }), {
    notes: { markdown: readMe }
  });
