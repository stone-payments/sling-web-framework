import 'sling-web-component-input'

export default {
    name: 'storybook-input',

    template: `
        <div>
            <h1>Simple label</h1>
            <sling-input label="Label" placeholder="Placeholder..."></sling-input>

            <h1>Disabled</h1>
            <sling-input label="Disabled" placeholder="Placeholder..." disabled></sling-input>

            <h1>Success</h1>
            <sling-input label="Success" placeholder="Placeholder..." validationstatus="success"></sling-input>

            <h1>Warning</h1>
            <sling-input label="Warning" placeholder="Placeholder..." validationstatus="warning"></sling-input>

            <h1>Error</h1>
            <sling-input label="Error" placeholder="Placeholder..." validationstatus="error"></sling-input>

            <h1>CNPJ</h1>
            <sling-input label="CNPJ" placeholder="Placeholder..." type="cnpj"></sling-input>

            <h1>CPF</h1>
            <sling-input label="CPF" placeholder="Placeholder..." type="cpf"></sling-input>

            <h1>Phone number</h1>
            <sling-input label="Telefone com DDD" placeholder="(00) 0000-0000" type="phone"></sling-input>

            <h1>Cell phone number</h1>
            <sling-input label="Celular com DDD" placeholder="(00) 00000-0000" type="phone"></sling-input>

            <h1>Email</h1>
            <sling-input label="email" placeholder="Placeholder..." type="email"></sling-input>

            <h1>CEP</h1>
            <sling-input label="cep" placeholder="Placeholder..." type="cep"></sling-input>
        </div>
    `,


};
