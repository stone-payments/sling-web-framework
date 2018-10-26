module.exports = {

  main: (browser) => {
    browser.url('http://localhost:8080/')
      .saveScreenshot('./reports/button-start.png')
      .elements('css selector', 'sling-button', (buttons) => {
        for (let i = 0; i < buttons.value.length; i++) {
          browser.elementIdClick(buttons.value[i].ELEMENT);
        }
      })
      .saveScreenshot('./reports/button-end.png')
      .assert.containsText('#counter', '110')
      .end();
  },
};
