const component = 'sling-web-component-snackbar';
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
      .saveScreenshot(`./reports/${component}/${component}-mid.png`)
      .execute('window.scrollTo(0,document.body.scrollHeight);')
      .saveScreenshot(`./reports/${component}/${component}-end.png`)
      .end();
  },
};
