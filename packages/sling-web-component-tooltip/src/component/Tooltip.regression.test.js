module.exports = {

  main: (browser) => {
    browser.url('http://localhost:8080/')
      .saveScreenshot('./reports/tooltip-no-hover.png')
      .moveToElement('sling-tooltip', 0, 0)
      .saveScreenshot('./reports/tooltip-hover.png')
      .end();
  },
};
