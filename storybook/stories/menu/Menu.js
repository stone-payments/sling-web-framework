import 'sling-web-component-menu';

export default {
    name: 'storybook-menu',
    template: `
    <h2>Menu Vertical (aberto)</h2>
    <sling-menu layout="vertical" size="large" class="menu-aberto">
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

    <h2>Menu Vertical apenas ícones</h2>
    <sling-menu layout="vertical" size="small" icononly>
      <sling-menu-item href="http://google.com" icon="info">Antecipação</sling-menu-item>
      <sling-menu-item href="http://google.com" icon="info">Antecipação</sling-menu-item>
      <sling-menu-item href="http://google.com" icon="info">Antecipação</sling-menu-item>
      <sling-menu-item href="http://google.com" icon="info">Antecipação</sling-menu-item>
    </sling-menu>

    <h2>Menu Horizontal</h2>
    <sling-menu layout="horizontal" size="large">
        <sling-menu-item href="http://google.com" active>Google</sling-menu-item>
        <sling-menu-item href="http://duckduckgo.com" >Duck</sling-menu-item>
        <sling-menu-item href="http://google.com">Google</sling-menu-item>
        <sling-menu-item href="http://duckduckgo.com" >Duck</sling-menu-item>
        <sling-menu-item href="http://google.com">Google</sling-menu-item>
        <sling-menu-item href="http://duckduckgo.com" >Duck</sling-menu-item>
        <sling-menu-item href="http://google.com">Google</sling-menu-item>
      </sling-menu>

    <h2>Menu Horizontal com ícones</h2>
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

    <h2>Menu Horizontal apenas ícones</h2>
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
