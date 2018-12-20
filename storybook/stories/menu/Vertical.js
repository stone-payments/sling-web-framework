import 'sling-web-component-menu';
import 'sling-web-component-menu-item';

export default {
    name: 'storybook-menu-vertical',

    template: `
    <sling-menu layout="vertical" size="large" class="menu-aberto" style="width: 300px">
        <sling-menu-item href="http://google.com" icon="info" active>Google</sling-menu-item>
        <sling-menu-item href="http://duckduckgo.com" icon="info">Duck</sling-menu-item>
        <sling-menu-item icon="info">
            <span slot="title">Risos</span>
            <sling-menu>
            <sling-menu-item href="http://palio.com">Palio</sling-menu-item>
            <sling-menu-item href="http://pudim.com">Pudim</sling-menu-item>
            <sling-menu-item>
                <span slot="title">Titulo</span>
                <sling-menu>
                <sling-menu-item href="http://google.com">Antecipação</sling-menu-item>
                <sling-menu-item href="http://google.com">Antecipação</sling-menu-item>
                <sling-menu-item>
                    <span slot="title">Titulo</span>
                    <sling-menu>
                        <sling-menu-item href="http://google.com">Antecipação</sling-menu-item>
                        <sling-menu-item href="http://google.com">Antecipação</sling-menu-item>
                        <sling-menu-item href="http://google.com">Antecipação</sling-menu-item>
                        <sling-menu-item href="http://google.com">Antecipação</sling-menu-item>
                    </sling-menu>
                </sling-menu-item>
                <sling-menu-item href="http://google.com">Antecipação</sling-menu-item>
                <sling-menu-item href="http://google.com">Antecipação</sling-menu-item>
                </sling-menu>
            </sling-menu-item>
            <sling-menu-item href="http://google.com">AltaVista</sling-menu-item>
            <sling-menu-item href="http://google.com">Amazon</sling-menu-item>
            <sling-menu-item href="http://google.com">Antecipação</sling-menu-item>
            <sling-menu-item href="http://google.com">Antecipação</sling-menu-item>
            <sling-menu-item href="http://google.com">Antecipação</sling-menu-item>
            </sling-menu>
        </sling-menu-item>
    </sling-menu>
    `,

};