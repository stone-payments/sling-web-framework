import 'sling-web-component-button'

export default {
    name: 'storybook-button',

    template: `
        <div>
            <sling-button layout="outline" disabled>Text</sling-button>
        </div>
    `,

    methods: {
        onClick() {
        this.$emit('click');
        },
    },

};
