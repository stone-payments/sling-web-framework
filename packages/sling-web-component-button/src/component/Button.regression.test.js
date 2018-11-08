const component = 'sling-web-component-button';
const customCode = false;
module.exports = {

  main: (browser) => {
    browser.url(`http://localhost:8777/${customCode ? 'regression' : ''}/index.html`)
      .saveScreenshot(`./reports/${component}/${component}-start.png`)
      .elements('css selector', 'sling-button', (buttons) => {
        buttons.value.forEach((button) => {
          browser.elementIdClick(button.ELEMENT);
        });
      })
      .saveScreenshot(`./reports/${component}/${component}-end.png`)
      .assert.containsText('#counter', '110')
      .end();
  },
};
