const component = 'sling-web-component-table';

module.exports = {

  main: (browser) => {
    browser.url('http://localhost:8080')
      .saveScreenshot(`./reports/${component}/${component}-start.png`)
      .execute(function () { /* eslint-disable-line*/
        const tableList = [];
        const tables = document.querySelectorAll('sling-table');
        tables.forEach(e =>
          tableList.push(e.shadowRoot.querySelectorAll('tr'),
          ));
        return tableList;
      }, [], function (tableList) { /* eslint-disable-line*/
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
