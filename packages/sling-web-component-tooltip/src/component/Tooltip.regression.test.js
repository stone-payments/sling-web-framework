const component = 'sling-web-component-tooptip';
const customCode = false;

module.exports = {
  main: (browser) => {
    browser.url(`http://localhost:8777/packages/${component}/${customCode ? 'public/regression' : 'public'}/index.html`)
      .saveScreenshot(`./reports/${component}/${component}-no-hover.png`)
      .moveToElement('sling-tooltip', 0, 0)
      .saveScreenshot(`./reports/${component}/${component}-hover.png`)
      .end();
  },
};
