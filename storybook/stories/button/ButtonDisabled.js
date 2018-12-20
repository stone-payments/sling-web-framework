import 'sling-web-component-button'

export default {
    name: 'storybook-fill-button',

    template: `
        <div>
            <h1>Small</h1>
            <sling-button size="small" disabled>Text</sling-button>
            <sling-button size="small" layout="outline" disabled>Text</sling-button>
            <sling-button size="small" layout="text" disabled>Text</sling-button>
            <sling-button slim size="small" disabled>Text</sling-button>
            <sling-button slim size="small" layout="outline" disabled>Text</sling-button>
            <sling-button slim size="small" layout="text" disabled>Text</sling-button>
            
            <h1>Normal</h1>
            <sling-button disabled>Text</sling-button>
            <sling-button layout="outline" disabled>Text</sling-button>
            <sling-button layout="text" disabled>Text</sling-button>
            <sling-button slim disabled>Text</sling-button>
            <sling-button slim layout="outline" disabled>Text</sling-button>
            <sling-button slim layout="text" disabled>Text</sling-button>

            <h1>Big</h1>
            <sling-button size="big" disabled>Text</sling-button>
            <sling-button size="big" layout="outline" disabled>Text</sling-button>
            <sling-button size="big" layout="text" disabled>Text</sling-button>
            <sling-button slim size="big" disabled>Text</sling-button>
            <sling-button slim size="big" layout="outline" disabled>Text</sling-button>
            <sling-button slim size="big" layout="text" disabled>Text</sling-button>
        </div>
    `,

};
