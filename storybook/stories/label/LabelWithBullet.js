import 'sling-web-component-label'

export default {
    name: 'storybook-with-bullet-label',

    template: `
        <div>
            <h1>Small</h1>
            <sling-label size="small" color="red" type="text" showBullet="true">LABEL</sling-label>
            <sling-label size="small" color="yellow" type="text" showBullet="true">LABEL</sling-label>
            <sling-label size="small" color="gray" type="text" showBullet="true">LABEL</sling-label>
            <sling-label size="small" color="green" type="text" showBullet="true">LABEL</sling-label>
            <sling-label size="small" color="purple" type="text" showBullet="true">LABEL</sling-label>

            <h1>Normal</h1>
            <sling-label size="medium" color="red" type="text" showBullet="true">LABEL</sling-label>
            <sling-label size="medium" color="yellow" type="text" showBullet="true">LABEL</sling-label>
            <sling-label size="medium" color="gray" type="text" showBullet="true">LABEL</sling-label>
            <sling-label size="medium" color="green" type="text" showBullet="true">LABEL</sling-label>
            <sling-label size="medium" color="purple" type="text" showBullet="true">LABEL</sling-label>

            <h1>Big</h1>
            <sling-label size="big" color="red" type="text" showBullet="true">LABEL</sling-label>
            <sling-label size="big" color="yellow" type="text" showBullet="true">LABEL</sling-label>
            <sling-label size="big" color="gray" type="text" showBullet="true">LABEL</sling-label>
            <sling-label size="big" color="green" type="text" showBullet="true">LABEL</sling-label>
            <sling-label size="big" color="purple" type="text" showBullet="true">LABEL</sling-label>
        </div>
    `,

    methods: {
        onClick() {
        this.$emit('click');
        },
    },

};
