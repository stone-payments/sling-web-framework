module.exports = {

  main: (browser) => {
    browser.url('http://localhost:8080/')
      .saveScreenshot('./reports/button-start.png')
      .elements('css selector', 'sling-button', (buttons) => {
        buttons.value.forEach((button) => {
          browser.elementIdClick(button.ELEMENT);
        });
      })
      .saveScreenshot('./reports/button-end.png')
      .assert.containsText('#counter', '110')
      .end();
  },
};
