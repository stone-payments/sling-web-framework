module.exports = {

  main: (browser) => {
    browser.url('http://localhost:8080/')
      .saveScreenshot('./reports/snackbar-start.png')
      .elements('css selector', 'sling-button', (buttons) => {
        buttons.value.forEach((button) => {
          browser.elementIdClick(button.ELEMENT);
        });
      })
      .saveScreenshot('./reports/snackbar-mid.png')
      .execute('window.scrollTo(0,document.body.scrollHeight);')
      .saveScreenshot('./reports/snackbar-end.png')
      .end();
  },
};
