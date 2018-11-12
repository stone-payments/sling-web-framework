const component = 'sling-web-component-card';
const customCode = false;

module.exports = {
  main: (browser) => {
    browser.url(`http://localhost:8777/${customCode ? 'regression' : ''}/index.html`)
      .saveScreenshot(`./reports/${component}/${component}.png`)
      .end();
  },
};
