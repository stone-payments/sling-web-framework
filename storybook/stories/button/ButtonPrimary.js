import 'sling-web-component-button'

export default {
    name: 'storybook-primary-button',

    template: `
        <div>
            <h1>Small</h1>
            <sling-button size="small" color="primary">Primary</sling-button>
            <sling-button size="small" color="primary" layout="outline">Primary</sling-button>
            <sling-button size="small" color="primary" layout="text">Primary</sling-button>
            <sling-button slim size="small" color="primary">Primary</sling-button>
            <sling-button slim size="small" color="primary" layout="outline">Primary</sling-button>
            <sling-button slim size="small" color="primary" layout="text">Primary</sling-button>
            
            <h1>Normal</h1>
            <sling-button color="primary">Primary</sling-button>
            <sling-button color="primary" layout="outline">Primary</sling-button>
            <sling-button color="primary" layout="text">Primary</sling-button>
            <sling-button slim color="primary">Primary</sling-button>
            <sling-button slim color="primary" layout="outline">Primary</sling-button>
            <sling-button slim color="primary" layout="text">Primary</sling-button>

            <h1>Big</h1>
            <sling-button size="big" color="primary">Primary</sling-button>
            <sling-button size="big" color="primary" layout="outline">Primary</sling-button>
            <sling-button size="big" color="primary" layout="text">Primary</sling-button>
            <sling-button slim size="big" color="primary">Primary</sling-button>
            <sling-button slim size="big" color="primary" layout="outline">Primary</sling-button>
            <sling-button slim size="big" color="primary" layout="text">Primary</sling-button>
        </div>
    `,

    methods: {
        onClick() {
        this.$emit('click');
        },
    },

};
