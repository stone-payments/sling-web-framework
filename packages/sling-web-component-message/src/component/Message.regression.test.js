module.exports = {

  main: (browser) => {
    browser.url('http://localhost:8080/')
      .saveScreenshot('./reports/message.png')
      .end();
  },
};
