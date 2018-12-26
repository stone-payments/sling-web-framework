import 'sling-web-component-snackbar'

export default {
    name: 'storybook-normal-snackbar',

    template: `
        <div>
            <h1>Snackbar normal</h1>

            <sling-snackbar closeable size="small">
                Here is a message for you.
                <sling-button slim color="light" layout="outline" size="small">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar closeable size="small" layout="outline">
                Here is a message for you.
                <sling-button slim layout="outline" size="small">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar closeable>
                Here is a message for you.
                <sling-button slim color="light" layout="outline">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar closeable layout="outline">
                Here is a message for you.
                <sling-button slim layout="outline">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar closeable size="big">
                Here is a message for you.
                <sling-button slim color="light" layout="outline" size="big">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar closeable size="big" layout="outline">
                Here is a message for you.
                <sling-button slim layout="outline" size="big">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar size="small">
                Here is a message for you.
                <sling-button slim color="light" layout="outline" size="small">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar size="small" layout="outline">
                Here is a message for you.
                <sling-button slim layout="outline" size="small">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar>
                Here is a message for you.
                <sling-button slim color="light" layout="outline">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar layout="outline">
                Here is a message for you.
                <sling-button slim layout="outline">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar size="big">
                Here is a message for you.
                <sling-button slim color="light" layout="outline" size="big">Action</sling-button>
            </sling-snackbar>

            <br />
            
            <sling-snackbar size="big" layout="outline">
                Here is a message for you.
                <sling-button slim layout="outline" size="big">Action</sling-button>
            </sling-snackbar>
        </div>
    `,

};
