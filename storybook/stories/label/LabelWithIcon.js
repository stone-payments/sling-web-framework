import 'sling-web-component-label'

export default {
    name: 'storybook-with-icon-label',

    template: `
        <div>
            <h1>Small</h1>
            
        </div>
    `,

    methods: {
        onClick() {
        this.$emit('click');
        },
    },

};
