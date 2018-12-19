import 'sling-web-component-label'

export default {
    name: 'storybook-fill-label',

    template: `
        <div>
            <h1>Small</h1>
            <sling-label size="small" color="red">LABEL</sling-label>

            <h1>Normal</h1>
            <sling-label size="medium" color="red">LABEL</sling-label>

            <h1>Big</h1>
            <sling-label size="big" color="red">LABEL</sling-label>
        </div>
    `,

    methods: {
        onClick() {
        this.$emit('click');
        },
    },

};
