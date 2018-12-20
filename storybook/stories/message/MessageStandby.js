import 'sling-web-component-message'

export default {
    name: 'storybook-stand-by-message',

    template: `
    <sling-message aim="standby"></sling-message>
    `,

    mounted: () => {
        document.querySelector('sling-message').srcdata = ['Some message.', 'Some other message.'];
    }

};
