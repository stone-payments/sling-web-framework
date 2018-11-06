
module.exports = {

  main: (browser) => {
    browser.url('http://localhost:8080/');
    /* eslint-disable */
    for (let i = 1; i <= 8; i++) {
      browser.execute(function (data) {
        let select = document.querySelector('sling-select')
        select.value = data;
        return select.shadowRoot.querySelector('select').options[data].text;
      }, [i], function (result) {
        browser.assert.equal(result.value, "Option " + i)
      });
    }
    /* eslint-enable */
    browser.saveScreenshot('./reports/select.png')
      .end();
  },
};
