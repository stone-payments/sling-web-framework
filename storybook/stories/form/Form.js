import 'sling-web-component-form'

export default {
    name: 'storybook-form',

    template: `
        <div>
            <h1>Example</h1>
            
            <sling-form>
                <sling-input name="name" type="text" label="Nome"></sling-input>
                <sling-input name="email" type="email" label="E-mail"></sling-input>
                <sling-input name="phone" type="phone" label="Telefone com DDD" placeholder="(00) 0000-0000"></sling-input>
                <sling-input name="cpf" type="cpf" label="CPF"></sling-input>
                <sling-input name="cnpj" type="cnpj" label="CNPJ"></sling-input>
                <sling-button type="submit" layout="outline" color="success">Enviar</sling-button>
            </sling-form>      
        </div>
    `,

};
