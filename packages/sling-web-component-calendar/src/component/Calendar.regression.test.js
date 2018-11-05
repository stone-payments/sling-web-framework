module.exports = {

  main: (browser) => {
    browser.url('http://localhost:8080/')
      /* eslint-disable */
      .execute(function () {
        return document.querySelector('sling-calendar').shadowRoot.querySelectorAll('.calendar__day')
      }, [], function (result) {
        result.value.forEach(calendar => {
          browser.elementIdClick(calendar.ELEMENT);
          browser.elementIdAttribute(calendar.ELEMENT, 'class', function (className) {
            let isSelected = className.value.includes('weekend') || className.value.includes('selected')
            browser.assert.equal(true, isSelected)
          })
        });

      });
    /* eslint-enable */
    browser.saveScreenshot('./reports/calendar.png')
      .end();
  },
};
