import 'sling-web-component-button'

export default {
    name: 'storybook-light-button',

    template: `
        <div>
            <h1>Small</h1>
            <sling-button size="small" color="light">Light</sling-button>
            <sling-button size="small" color="light" layout="outline">Light</sling-button>
            <sling-button size="small" color="light" layout="text">Light</sling-button>
            <sling-button slim size="small" color="light">Light</sling-button>
            <sling-button slim size="small" color="light" layout="outline">Light</sling-button>
            <sling-button slim size="small" color="light" layout="text">Light</sling-button>
            
            <h1>Normal</h1>
            <sling-button color="light">Light</sling-button>
            <sling-button color="light" layout="outline">Light</sling-button>
            <sling-button color="light" layout="text">Light</sling-button>
            <sling-button slim color="light">Light</sling-button>
            <sling-button slim color="light" layout="outline">Light</sling-button>
            <sling-button slim color="light" layout="text">Light</sling-button>

            <h1>Big</h1>
            <sling-button size="big" color="light">Light</sling-button>
            <sling-button size="big" color="light" layout="outline">Light</sling-button>
            <sling-button size="big" color="light" layout="text">Light</sling-button>
            <sling-button slim size="big" color="light">Light</sling-button>
            <sling-button slim size="big" color="light" layout="outline">Light</sling-button>
            <sling-button slim size="big" color="light" layout="text">Light</sling-button>
        </div>
    `,


};
