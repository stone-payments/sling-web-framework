import 'sling-web-component-card'

export default {
    name: 'storybook-card',

    template: `
        <div>
            <h1>Examples</h1>
            
            <sling-card>
                <span slot="header">Header</span>
            </sling-card>

            <br />

            <sling-card>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
            </sling-card>

            <br />

            <sling-card>
                <span slot="footer">Footer</span>
            </sling-card>

            <br />

            <sling-card>
                <span slot="header">Title</span>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
            </sling-card>

            <br />

            <sling-card>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
                <span slot="footer">Footer</span>
            </sling-card>

            <br />

            <sling-card>
                <span slot="header">Header</span>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
                <span slot="footer">Footer</span>
            </sling-card>

            <br />

            <sling-card nodivisors>
                <span slot="header">Header</span>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
                <span slot="footer">Footer</span>
            </sling-card>

            <br />

            <sling-card nopadding>
                <span slot="header">Header</span>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
                <span slot="footer">Footer</span>
            </sling-card>

            <br />

            <sling-card nopadding nodivisors>
                <span slot="header">Header</span>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
                <span slot="footer">Footer</span>
            </sling-card>
        </div>
    `,

};
