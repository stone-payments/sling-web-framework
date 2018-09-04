# Passo a passo para criar um componente de negócios.


## Adicionando métodos na SDK

1. Identificar o endpoint, ou os endpoints, que serão usados.

Exemplo: https://randomuser.me/api/

2. Saber os contratos dos endpoints: o que precisam receber, como precisam receber e o que retornam.

O endereço do endpoint é: https://randomuser.me/api

O endpoint recebe os parâmetros:

* results (total de resultados)
* format (json, pretty, csv, yaml, xml)

O endpoint retorna o seguinte:

```javascript
{
  "results": [
    {
      "gender": "female",
      "name": {
        "title": "miss",
        "first": "loreen",
        "last": "meyer"
      },
      "location": {
        "street": "8016 kastanienweg",
        "city": "wesermarsch",
        "state": "thüringen",
        "postcode": 59057
      },
      "email": "loreen.meyer@example.com",
      "login": {
        "username": "brownlion563",
        "password": "happy123",
        "salt": "5GFUoXbC",
        "md5": "acf0ef5e2bcee1fa8222cdee8d79c5ca",
        "sha1": "fd17da3dff272af6150c9cda79a4b30e536ffe47",
        "sha256": "2863bc4f8867b2e974080b3e6d80c54eabc48511a28de67f7177c01780fd9ecc"
      },
      "dob": "1993-10-24 00:14:42",
      "registered": "2005-09-16 12:05:37",
      "phone": "0107-3390870",
      "cell": "0176-9801912",
      "id": {
        "name": "",
        "value": null
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/84.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/84.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/84.jpg"
      },
      "nat": "DE"
    }
  ],
  "info": {
    "seed": "8979a6a2e9e1a4d8",
    "results": 3,
    "page": 1,
    "version": "1.1"
  }
}
```

3. Com mocks das respostas em mãos, entender como os dados precisam ser modelados para que sejam passados para os componentes básicos que vão compor o comopente de negócios. Para isso, é necessário entender como os componentes básicos recebem dados, lendo a documentação.

Dica: o componente tabela espera receber uma coleção, ou seja, um array de objetos.

4. Criar um modelo que recebe os dados crus e retorna os dados modelados. Essa função deve ser exportada.

* Gravar em `sling-web-sdk/src/models/{nomeDoArquivo.js}`

5. Criar um serviço que coleta dados dos endpoints. O serviço usa, por padrão, uma função auxiiar que também trata possíveis erros de resposta.

* Importar a função auxiiar `getService`;

* Criar uma função que recebe os parâmetros necessários para montar a chamada à API, faz a chamada e retorna o resultado. Esse função retorna uma Promise e deve ser exportada.

* Gravar o serviço em `sling-web-sdk/src/core/services/{nomeDoArquivo.js}`.

6. Para juntar o serviço ao modelo, criamos uma ação do Redux, que é a base da nossa SDK. A ação usa o serviço para fazer a chamada e, ao receber a resposta, dispara um evento do Redux que repassa a resposta já modelada.

* Importar o serviço e o modelo.

* A action tem o seguinte formato:

```javascript
const getInfo = requestParams => dispatch => {
  service.getInfo(requestParams).then(response => {
    dispatch({
      type: 'GET_INFO',
      data: model(response)
    })
  });
};
```

* Gravar a action em `sling-web-sdk/src/container/actions/{nomeDoArquivo.js}`.

7. O Redux usa reducers, que são funções que atualizam o estado da aplicação. N aversão, ao usar o paradigma de programação funcional, reducers recebem o estado antigo e criam um novo estado a partir de uma ação.

```javascript
const reducer = (oldState, action) => newState
```

* Mais detalhadamente:

```javascript
const reducer = (state = {}, action = {}) => {
  switch(action.type) {
    case 'ACTION_NAME':
      return { ...state, data: action.data }
    
    default:
      return state;
  }
}
```

* Cada reducer é responsável por atualizar parte da Store, que é o objeto único que guarda todo o estado da aplicação.

```javascript
const Store = {
  userReducer: {
    userDetails: [],
  },
  merchantReducer: {
    merchantContacts: [],
    merchantPartners: [],
    merchantAddresses: [],
    merchantInfo: [],
    merchantBankInfo: [],
  },
  paymentsReducer: {
    paymentsCalendarInfo: [],
    paymentOperationsInfo: [],
    paymentDetailsInfo: [],
    paymentDetailsInfoByWalletTypeId: [],
  }
}
```

* Quaisquer alterações na store disparam eventos que os componentes estarão ouvindo.

* Gravar o reducer em `sling-web-sdk/src/container/reducers/{nomeDoArquivo.js}`.


## Criando a estrutura de um novo compoenente de negócios

1. Criar uma pasta para o componente, copiando a estrutura básica:

```
sling-web-business-{component-name}/
├─ src/
│  ├─ assets/
│  │  └─ {ComponentName}.css
│  ├─ component/
│  │  └─ {ComponentName}.js
│  ├─ index.css
│  └─ index.js
├─ .gitignore
├─ .npmignore
├─ index.html
├─ index.js
├─ package.json
└─ README.md
```

* A notacão entre chaves significa que esse o nome deve ser alterado. Em pastas, palavras são em caixa-baixa, separadas por hífen. Nomes de arquivos e classes são em PascalCase.

* O arquivo .gitignore esconde arquivos que não devem ir para o repositório. Ele é igual para todos os componentes.

* O arquivo .npmignore esconde arquivos que não devem ser distribuídos. Ele é igual para todos os componentes.

* Os arquivos index.html e index.js da raiz são arquivos de teste e desenvolvimento. São eles que são abertos ao rodar o comando `npm start`. Eles devem ser usados para desenvolver o componente.

* O arquivo package.json declara todas as dependências dos componentes. Para um componente de negócios é necessário instalar o `sling-web-helpers` e quaisquer componentes básicos que serão utilizados.

* A instalação de dependências é feita pelo comando `lerna add pacote --scope=destino`. Exemplo: `lerna add sling-web-helpers --scope=sling-web-business-user-details` vai instalar o pacote `sling-web-helpers` no componente de negócios `sling-web-business-user-details`.

* O arquivo README.md contém a documentação do componente.

2. A pasta `src` é onde mora o componente.

* A pasta `assets` guarda a aparência do componente, enquanto a pasta `component` guarda o template e a funcionalidade.

* O arquivo `{ComponentName}.js` exporta a classe javascript que o define.

* O arquivo `{ComponentName}.css` export o CSS que o estiliza.

* O arquivo `index.js` na raiz da pasta `src` importa a classe javascript do compoenente e usa uma função auxiliar para declará-lo ao navegador. Esse é o arquivo que é importado ao usar o componente em quaisquer projetos.

* O arquivo `index.css` na raiz da pasta `src` importa e expõe o CSS. Esse arquivo é injetado no arquivo `index.js` durante ao gerar o "build" usando o comando `npm run build`.


## Criando o componente de negócios em si

### No terminal, na pasta raiz do projeto.

1. Copiar o arquivo `package.json` de outro componente de negócios e alterar a propriedade `name` para a do componente.

* O nome do componente sempre começa com `sling-web`; seguido pelo termo `business`, caso seja um componente de negócios, ou pelo termo `component`, caso seja um componente básico; e pelo nome do componente.

2. Instalar as dependências.

* Todos os componentes de negócio importam `sling-web-helpers`, `sling-web-sdk`, `sling-web-framework` obrigatoriamente e mais os componentes básicos que forem necessários.

* É preciso ter o comando `lerna` instalado globalmente na máquina. Caso não esteja disponível no terminal, é preciso instalá-lo usando o comando `npm install -g lerna`.

* Para cada dependência a ser instalada, rodar o comando `lerna`. Exemplos:

```bash
lerna add sling-web-framework --scope=sling-web-business-{component-name}
lerna add sling-web-helpers --scope=sling-web-business-{component-name}
lerna add sling-web-sdk --scope=sling-web-business-{component-name}
```

### No arquivo {Component}.js

1. Importar `SlingBusinessElement` e `html` do pacote `sling-web-framework`.

* A classe `SlingBusinessElement` deve ser estendida por todos os componentes de negócios. Ela está ciente da SDK e já tem propriedades necessárias para fazer chamadas na API setadas por padrão.

* A função `html` é responsável por interpretar templates e transformá-los em HTML. Essa função é usada no método `render` da classe.

2. Declarar as propriedades que serão usadas pelas classes. As propriedades são a maneira como o componente se comunica com a aplicação, seja via html ou via javascript.

** ESCREVER **

3. Declarar as propriedades dos compoenentes. As propriedades são a comunicação do componente com o mundo externo via html e javascript. As propriedades também compõem as chamadas de api.

* Propriedades são sempre lowercase.

* Declarar, no componente de negócios, as propriedades que serão necessárias para que o serviço realize a chamada. Algumas propriedades são padrão, como `stonecode` e `apitoken`, e não precisam ser declaradas.

* Toda a vez que as propriedades que compõem chamadas a api mudarem, uma nova chamada poderá ser feita. No entanto, o sistema irá esperar que todas as propriedades declaradas como obrigatórias estejam presentes antes de realizar qualquer chamada.

4. Associar um serviço de chamada da api ao método getdata via `mapDispatchToProps`.

* O método getdata do componente recebe a resposta da api já modelada toda a vez que a api é chamada. Usar esse método para popular as informações no componente.

5. Associar propriedades da Store à propriedades do componente via `mapStateToProps`.

6. Expondo os dados por meio de eventos

7. Estilização do componente

8. Como testar o componente criado

9. Como documentar o componente criado
