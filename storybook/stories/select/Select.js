import 'sling-web-component-select'

export default {
    name: 'storybook-select',

    template: `
        <div>
            <h1>Normal</h1>
            <sling-select></sling-select>

            <h1>Disabled</h1>
            <sling-select disabled></sling-select>
        </div>
    `,

};
