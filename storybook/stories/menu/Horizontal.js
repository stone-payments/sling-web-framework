import 'sling-web-component-menu';
import 'sling-web-component-menu-item';

export default {
    name: 'storybook-menu-horizontal',

    template: `
    <div>
        <h2>No icons</h2>
        <sling-menu layout="horizontal" size="large">
            <sling-menu-item href="http://google.com" active>Google</sling-menu-item>
            <sling-menu-item href="http://duckduckgo.com" >Duck</sling-menu-item>
            <sling-menu-item href="http://google.com">Google</sling-menu-item>
            <sling-menu-item href="http://duckduckgo.com" >Duck</sling-menu-item>
            <sling-menu-item href="http://google.com">Google</sling-menu-item>
            <sling-menu-item href="http://duckduckgo.com" >Duck</sling-menu-item>
            <sling-menu-item href="http://google.com">Google</sling-menu-item>
        </sling-menu>
        <h2>With icons</h2>
        <sling-menu layout="horizontal" size="medium">
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
    </div>
    `,

};