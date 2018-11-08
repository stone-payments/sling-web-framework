const component = 'sling-web-component-select';
const customCode = false;

module.exports = {
  main: (browser) => {
    browser.url(`http://localhost:8777/${customCode ? 'regression' : ''}/index.html`);
    for (let i = 1; i <= 8; i += 1) {
      browser.execute(function (data) {
        const select = document.querySelector('sling-select');
        select.value = data;
        return select.shadowRoot.querySelector('select').options[data].text;
      }, [i], function (result) {
        browser.assert.equal(result.value, `Option ${i}`);
      });
    }
    browser.saveScreenshot(`./reports/${component}/${component}.png`)
      .end();
  },
};
