import 'sling-web-component-button'

export default {
    name: 'storybook-success-button',

    template: `
        <div>
            <h1>Small</h1>
            <sling-button size="small" color="success">Confirm</sling-button>
            <sling-button size="small" color="success" layout="outline">Confirm</sling-button>
            <sling-button size="small" color="success" layout="text">Confirm</sling-button>
            <sling-button slim size="small" color="success">Confirm</sling-button>
            <sling-button slim size="small" color="success" layout="outline">Confirm</sling-button>
            <sling-button slim size="small" color="success" layout="text">Confirm</sling-button>
            
            <h1>Normal</h1>
            <sling-button color="success">Confirm</sling-button>
            <sling-button color="success" layout="outline">Confirm</sling-button>
            <sling-button color="success" layout="text">Confirm</sling-button>
            <sling-button slim color="success">Confirm</sling-button>
            <sling-button slim color="success" layout="outline">Confirm</sling-button>
            <sling-button slim color="success" layout="text">Confirm</sling-button>

            <h1>Big</h1>
            <sling-button size="big" color="success">Confirm</sling-button>
            <sling-button size="big" color="success" layout="outline">Confirm</sling-button>
            <sling-button size="big" color="success" layout="text">Confirm</sling-button>
            <sling-button slim size="big" color="success">Confirm</sling-button>
            <sling-button slim size="big" color="success" layout="outline">Confirm</sling-button>
            <sling-button slim size="big" color="success" layout="text">Confirm</sling-button>
        </div>
    `,

    methods: {
        onClick() {
        this.$emit('click');
        },
    },

};
