const component = 'sling-web-component-calendar';
const customCode = false;

module.exports = {
  main: (browser) => {
    browser.url(`http://localhost:8777/${customCode ? 'regression' : ''}/index.html`)
      .execute(function () {
        return document.querySelector('sling-calendar').shadowRoot
          .querySelectorAll('.calendar__day:not(.calendar__day_weekend)');
      }, [], function (result) {
        result.value.forEach((calendar) => {
          browser.elementIdClick(calendar.ELEMENT);
          browser.elementIdAttribute(calendar.ELEMENT, 'class',
            function (className) {
              const isSelected = className.value.includes('selected');
              browser.assert.equal(true, isSelected);
            });
        });
      });
    browser.saveScreenshot(`./reports/${component}/${component}.png`)
      .end();
  },
};
