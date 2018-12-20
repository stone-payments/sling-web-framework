import 'sling-web-component-table';

export default {
    name: 'storybook-table-no-header',

    template: `
        <sling-table noheader></sling-table>
    `,
    mounted: () => {
      const detailcolumns = [
        {
          title: 'Categoria',
          field: 'category',
        },
        {
          title: 'Data de Venda',
          field: 'saledate',
          type: 'date',
          secondaryField:'salehour',
          secondaryType:'time'
        },
        {
          title: 'Tipo',
          field: 'producttype',
        },{
          title: 'Parcela',
          field: 'installments',
        },{
          title: 'Origem',
          field: 'originbrandid',
          type: 'brand_icon',
        },{
          title: 'Stone ID',
          field: 'stoneid',
        },
        {
          title: 'Valor bruto',
          field: 'grossamount',
          type: 'currency',
        },{
          title: 'Valor liquido',
          field: 'natamount',
          type: 'currency',
        },
      ];

      const detailpayload = [
        {
          category: 'Saldo Inicial',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 2,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        },
        {
          category: 'Venda',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 4,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        },
        {
          category: 'Cancelamento Parcial',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 5,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        },
        {
          category: 'Saldo Final',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 3,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        }, {
          category: 'Saldo Inicial',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 2,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        },
        {
          category: 'Venda',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 4,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        },
        {
          category: 'Cancelamento Parcial',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 5,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        },
        {
          category: 'Saldo Final',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 3,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        },
        {
          category: 'Saldo Inicial',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 2,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        },
        {
          category: 'Venda',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 4,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        },
        {
          category: 'Cancelamento Parcial',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 5,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        },
        {
          category: 'Saldo Final',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 3,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        }, {
          category: 'Saldo Inicial',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 2,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        },
        {
          category: 'Venda',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 4,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        },
        {
          category: 'Cancelamento Parcial',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 5,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        },
        {
          category: 'Saldo Final',
          saledate:'2018-04-30T00:00:00.000Z',
          salehour:'2018-04-30T00:00:00.000Z',
          producttype:'Crédito 10x',
          installments: 5,
          originbrandid: 3,
          stoneid: 99999999999,
          grossamount: 467012,
          natamount: 467012,
        }
      ];

      const $table = document.querySelector('sling-table');
      $table.srcdata = detailpayload;
      $table.srccolumns = detailcolumns;
    }

};
