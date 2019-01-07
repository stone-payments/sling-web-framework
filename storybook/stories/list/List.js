import 'sling-web-component-list';


export default {
  name: 'storybook-list',

  template: `
<div>
    <sling-list
    id="cascade-list"
    cascadelist>
    </sling-list>

    <sling-list
    id="list"
    >
    </sling-list>
</div>
  `,
  mounted: () => {
    const data = [
      {
        Descrição: 'teste',
        UF: 'teste',
        Cidade: 'teste',
        Endereço: 'teste',
        Número: 'teste',
        Complemento: 'teste',
        Bairro: 'teste',
      },
    ];
    const keys = [
      'Descrição',
      'UF',
      'Cidade',
      'Endereço',
      'Número',
      'Complemento',
      'Bairro',
    ]
    const $list = document.querySelector('#list');
    const $cascadeList = document.querySelector('#cascade-list');

    $list.srcdata = data;
    $list.srckeys = keys;
    $cascadeList.srcdata = data;
    $cascadeList.srckeys = keys;
  },

};
