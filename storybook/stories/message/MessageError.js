import 'sling-web-component-message'

export default {
    name: 'storybook-error-message',

    template: `
    <sling-message aim="error"></sling-message>
    `,

    mounted: () => {
        document.querySelector('sling-message').srcdata = ['Some message.', 'Some other message.'];
    }

};
