import 'sling-web-component-message'

export default {
    name: 'storybook-success-message',

    template: `
    <sling-message aim="success"></sling-message>
    `,

    mounted: () => {
        document.querySelector('sling-message').srcdata = ['Some message.', 'Some other message.'];
    }

};
