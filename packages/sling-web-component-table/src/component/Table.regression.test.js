const component = 'sling-web-component-table';
const customCode = false;

module.exports = {

  main: (browser) => {
    browser.url(`http://localhost:8777/${customCode ? 'regression' : ''}/index.html`)
      .saveScreenshot(`./reports/${component}/${component}-start.png`)
      .execute(function () {
        const tableList = [];
        const tables = document.querySelectorAll('sling-table');
        tables.forEach(e =>
          tableList.push(e.shadowRoot.querySelectorAll('tbody tr'),
          ));
        return tableList;
      }, [], function (tableList) {
        tableList.value.forEach((table, i) => {
          table.forEach((row) => {
            browser.elementIdClick(row.ELEMENT);
          });
          browser.saveScreenshot(`./reports/${component}/${component}-${i}.png`);
        });
      })
      .end();
  },
};
