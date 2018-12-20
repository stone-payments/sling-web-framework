import 'sling-web-component-snackbar'

export default {
    name: 'storybook-success-snackbar',

    template: `
        <div>
            <h1>Snackbar success</h1>

            <sling-snackbar closeable size="small" aim="success">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar closeable size="small" aim="success" layout="outline">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar closeable aim="success">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar closeable aim="success" layout="outline">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar closeable size="big" aim="success">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar closeable size="big" aim="success" layout="outline">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar size="small" aim="success">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar size="small" aim="success" layout="outline">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar aim="success">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar aim="success" layout="outline">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar size="big" aim="success">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar size="big" aim="success" layout="outline">
                Here is a message for you.
            </sling-snackbar>
        </div>
    `,

};
