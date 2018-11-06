const component = 'sling-web-component-brand-icon';

module.exports = {
  main: (browser) => {
    browser.url(`http://localhost:8777/packages/${component}/public/index.html`)
      .saveScreenshot(`./reports/${component}/${component}.png`)
      .end();
  },
};
