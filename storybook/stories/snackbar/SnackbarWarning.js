import 'sling-web-component-snackbar'

export default {
    name: 'storybook-warning-snackbar',

    template: `
        <div>
            <h1>Snackbar warning</h1>

            <sling-snackbar closeable size="small" aim="warning">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar closeable size="small" aim="warning" layout="outline">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar closeable aim="warning">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar closeable aim="warning" layout="outline">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar closeable size="big" aim="warning">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar closeable size="big" aim="warning" layout="outline">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar size="small" aim="warning">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar size="small" aim="warning" layout="outline">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar aim="warning">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar aim="warning" layout="outline">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar size="big" aim="warning">
                Here is a message for you.
            </sling-snackbar>

            <br />

            <sling-snackbar size="big" aim="warning" layout="outline">
                Here is a message for you.
            </sling-snackbar>
        </div>
    `,



};
