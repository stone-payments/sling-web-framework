import 'sling-web-component-menu';
import 'sling-web-component-menu-item';

export default {
    name: 'storybook-menu-icon',

    template: `
    <sling-menu layout="horizontal" size="large" icononly>
        <sling-menu-item href="http://google.com" icon="info" active>Google</sling-menu-item>
        <sling-menu-item href="http://duckduckgo.com"  icon="info">Duck</sling-menu-item>
        <sling-menu-item href="http://google.com" icon="info">Google</sling-menu-item>
        <sling-menu-item href="http://duckduckgo.com"  icon="info">Duck</sling-menu-item>
        <sling-menu-item href="http://google.com" icon="info">Google</sling-menu-item>
        <sling-menu-item href="http://duckduckgo.com"  icon="info">Duck</sling-menu-item>
        <sling-menu-item href="http://google.com" icon="info">Google</sling-menu-item>
        <sling-menu-item href="http://duckduckgo.com"  icon="info">Duck</sling-menu-item>
        <sling-menu-item href="http://google.com" icon="info">Google</sling-menu-item>
        <sling-menu-item href="http://duckduckgo.com"  icon="info">Duck</sling-menu-item>
    </sling-menu>
    `,

};