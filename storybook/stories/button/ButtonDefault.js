import 'sling-web-component-button'

export default {
    name: 'storybook-default-button',

    template: `
        <div>
            <h1>Small</h1>
            <sling-button size="small">Text</sling-button>
            <sling-button size="small" layout="outline">Text</sling-button>
            <sling-button size="small" layout="text">Text</sling-button>
            <sling-button slim size="small">Text</sling-button>
            <sling-button slim size="small" layout="outline">Text</sling-button>
            <sling-button slim size="small" layout="text">Text</sling-button>

            <h1>Normal</h1>
            <sling-button>Text</sling-button>
            <sling-button layout="outline">Text</sling-button>
            <sling-button layout="text">Text</sling-button>
            <sling-button slim>Text</sling-button>
            <sling-button slim layout="outline">Text</sling-button>
            <sling-button slim layout="text">Text</sling-button>

            <h1>Big</h1>
            <sling-button size="big">Text</sling-button>
            <sling-button size="big" layout="outline">Text</sling-button>
            <sling-button size="big" layout="text">Text</sling-button>
            <sling-button slim size="big">Text</sling-button>
            <sling-button slim size="big" layout="outline">Text</sling-button>
            <sling-button slim size="big" layout="text">Text</sling-button>
        </div>
    `,

};
