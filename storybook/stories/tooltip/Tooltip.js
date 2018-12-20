import 'sling-web-component-tooltip'

export default {
    name: 'storybook-tooltip',

    template: `
        <div>
            <h1>List of tooltips</h1>

            <sling-tooltip  position="left" tooltiptext="Tooltip">Hover me</sling-tooltip>

            <br />

            <sling-tooltip  position="top" tooltiptext="Tooltip">Hover me</sling-tooltip>

            <br />

            <sling-tooltip  position="right" tooltiptext="Tooltip">Hover me</sling-tooltip>

            <br />

            <sling-tooltip  position="bottom" tooltiptext="Tooltip">Hover me</sling-tooltip>
        </div>
    `,

};
