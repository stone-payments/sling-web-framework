import 'sling-web-component-paginator'

export default {
    name: 'storybook-paginator',

    template: `
        <div>
            <h1>Examples</h1>
            
            <sling-paginator></sling-paginator>

            <br />

            <sling-paginator total="5"></sling-paginator>

            <br />

            <sling-paginator total="5" selected="3"></sling-paginator>

            <br />

            <sling-paginator total="12" selected="3"></sling-paginator>
        </div>
    `,

};
