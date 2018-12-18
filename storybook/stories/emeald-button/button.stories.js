import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MyButton from './Button';

// import 'sling-web-component-button'

// import MyButton from './Button.vue';

storiesOf('Button', module)
  .add('Test', () => ({
    components: { MyButton },
    template: '<my-button>Hello Button</my-button>',
    methods: { action: action('clicked') },
  }))
  // .add('Test', () => '<sling-button>meu teste</sling-button>')
  // .add('Test', () => ({
  //   template: '<sling-button color="primary">Text</sling-button>',
  // }))
  ;


// const stories = storiesOf('Button', module);

// stories
//   // .add('Primary', () => <sling-button disabled>Text</sling-button>)
//   .add('Primary', () => '<my-button @click="action">Hello Button</my-button>')