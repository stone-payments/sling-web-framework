module.exports = {

  main: (browser) => {
    browser.url('http://localhost:8080/')
      .saveScreenshot('./reports/brand-icon.png')
      .end();
  },
};
