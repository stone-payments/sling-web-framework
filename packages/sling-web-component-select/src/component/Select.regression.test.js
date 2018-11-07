const component = 'sling-web-component-select';
const customCode = false;
 module.exports = {
  main: (browser) => {
    browser.url(`http://localhost:8777/packages/${component}/${customCode ? 'public/regression' : 'public'}/index.html`);
    for (let i = 1; i <= 8; i++) { // eslint-disable-line
      browser.execute(function (data) { // eslint-disable-line
        const select = document.querySelector('sling-select');
        select.value = data;
        return select.shadowRoot.querySelector('select').options[data].text;
      }, [i], function (result) { // eslint-disable-line
        browser.assert.equal(result.value, `Option ${i}`);
      });
    }
    browser.saveScreenshot(`./reports/${component}/${component}.png`)
      .end();
  },
};
