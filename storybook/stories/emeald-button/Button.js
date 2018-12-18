import 'sling-web-component-button'

export default {
  name: 'my-button',

  data() {
    return {
      buttonStyles: {
        border: '1px solid #eee',
        borderRadius: 3,
        backgroundColor: '#FFFF00',
        cursor: 'pointer',
        fontSize: 15,
        padding: '3px 10px',
        margin: 10,
      },
    };
  },

  template: `
    <sling-button disabled>Texteeee</sling-button>
  `,

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
