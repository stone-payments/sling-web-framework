import 'sling-web-component-button'

export default {
    name: 'storybook-danger-button',

    template: `
        <div>
            <h1>Small</h1>
            <sling-button size="small" color="danger">Cancel</sling-button>
            <sling-button size="small" color="danger" layout="outline">Cancel</sling-button>
            <sling-button size="small" color="danger" layout="text">Cancel</sling-button>
            <sling-button slim size="small" color="danger">Cancel</sling-button>
            <sling-button slim size="small" color="danger" layout="outline">Cancel</sling-button>
            <sling-button slim size="small" color="danger" layout="text">Cancel</sling-button>
            
            <h1>Normal</h1>
            <sling-button color="danger">Cancel</sling-button>
            <sling-button color="danger" layout="outline">Cancel</sling-button>
            <sling-button color="danger" layout="text">Cancel</sling-button>
            <sling-button slim color="danger">Cancel</sling-button>
            <sling-button slim color="danger" layout="outline">Cancel</sling-button>
            <sling-button slim color="danger" layout="text">Cancel</sling-button>

            <h1>Big</h1>
            <sling-button size="big" color="danger">Cancel</sling-button>
            <sling-button size="big" color="danger" layout="outline">Cancel</sling-button>
            <sling-button size="big" color="danger" layout="text">Cancel</sling-button>
            <sling-button slim size="big" color="danger">Cancel</sling-button>
            <sling-button slim size="big" color="danger" layout="outline">Cancel</sling-button>
            <sling-button slim size="big" color="danger" layout="text">Cancel</sling-button>
        </div>
    `,

    methods: {
        onClick() {
        this.$emit('click');
        },
    },

};
