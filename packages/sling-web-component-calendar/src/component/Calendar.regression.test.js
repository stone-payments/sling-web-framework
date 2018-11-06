const component = 'sling-web-component-calendar';
const customCode = false;

module.exports = {
  main: (browser) => {
    browser.url(`http://localhost:8777/packages/${component}/${customCode ? 'public/regression' : 'public'}/index.html`)
      .execute(function () { // eslint-disable-line
        return document.querySelector('sling-calendar')
          .shadowRoot.querySelectorAll('.calendar__day');
      }, [], function (result) { // eslint-disable-line
        result.value.forEach((calendar) => {
          browser.elementIdClick(calendar.ELEMENT);
          browser.elementIdAttribute(calendar.ELEMENT, 'class', function (className) { // eslint-disable-line
            const isSelected = className.value.includes('weekend')
                                 || className.value.includes('selected');
            browser.assert.equal(true, isSelected);
          });
        });
      });
    browser.saveScreenshot(`./reports/${component}/${component}.png`)
      .end();
  },
};
