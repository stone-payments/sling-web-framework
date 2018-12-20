import 'sling-web-component-snackbar'

export default {
    name: 'storybook-danger-snackbar',

    template: `
        <div>
            <h1>Snackbar danger</h1>

            <sling-snackbar closeable size="small" aim="danger">
                Here is a message for you.
                <sling-button slim color="light" layout="outline" size="small">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar closeable size="small" aim="danger" layout="outline">
                Here is a message for you.
                <sling-button slim layout="outline" size="small">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar closeable aim="danger">
                Here is a message for you.
                <sling-button slim color="light" layout="outline">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar closeable aim="danger" layout="outline">
                Here is a message for you.
                <sling-button slim layout="outline">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar closeable size="big" aim="danger">
                Here is a message for you.
                <sling-button slim color="light" layout="outline" size="big">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar closeable size="big" aim="danger" layout="outline">
                Here is a message for you.
                <sling-button slim layout="outline" size="big">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar size="small" aim="danger">
                Here is a message for you.
                <sling-button slim color="light" layout="outline" size="small">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar size="small" aim="danger" layout="outline">
                Here is a message for you.
                <sling-button slim layout="outline" size="small">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar aim="danger">
                Here is a message for you.
                <sling-button slim color="light" layout="outline">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar aim="danger" layout="outline">
                Here is a message for you.
                <sling-button slim layout="outline">Action</sling-button>
            </sling-snackbar>

            <br />

            <sling-snackbar size="big" aim="danger">
                Here is a message for you.
                <sling-button slim color="light" layout="outline" size="big">Action</sling-button>
            </sling-snackbar>

            <br />
            
            <sling-snackbar size="big" aim="danger" layout="outline">
                Here is a message for you.
                <sling-button slim layout="outline" size="big">Action</sling-button>
            </sling-snackbar>
        </div>
    `,


};
