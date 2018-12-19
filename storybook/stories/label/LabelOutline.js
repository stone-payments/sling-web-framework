import 'sling-web-component-label'

export default {
    name: 'storybook-only-text-label',

    template: `
        <div>
            <h1>Small</h1>
            <sling-label size="small" color="red" type="outline">LABEL</sling-label>
            <sling-label size="small" color="yellow" type="outline">LABEL</sling-label>
            <sling-label size="small" color="gray" type="outline">LABEL</sling-label>
            <sling-label size="small" color="green" type="outline">LABEL</sling-label>
            <sling-label size="small" color="purple" type="outline">LABEL</sling-label>

            <h1>Normal</h1>
            <sling-label size="medium" color="red" type="outline">LABEL</sling-label>
            <sling-label size="medium" color="yellow" type="outline">LABEL</sling-label>
            <sling-label size="medium" color="gray" type="outline">LABEL</sling-label>
            <sling-label size="medium" color="green" type="outline">LABEL</sling-label>
            <sling-label size="medium" color="purple" type="outline">LABEL</sling-label>

            <h1>Big</h1>
            <sling-label size="big" color="red" type="outline">LABEL</sling-label>
            <sling-label size="big" color="yellow" type="outline">LABEL</sling-label>
            <sling-label size="big" color="gray" type="outline">LABEL</sling-label>
            <sling-label size="big" color="green" type="outline">LABEL</sling-label>
            <sling-label size="big" color="purple" type="outline">LABEL</sling-label>
        </div>
    `,

    methods: {
        onClick() {
        this.$emit('click');
        },
    },

};
