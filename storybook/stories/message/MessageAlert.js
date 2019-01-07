import 'sling-web-component-message'

export default {
    name: 'storybook-alert-message',

    template: `
    <sling-message aim="alert"></sling-message>
    `,

    mounted: () => {
        document.querySelector('sling-message').srcdata = ['Some message.', 'Some other message.'];
    }

};