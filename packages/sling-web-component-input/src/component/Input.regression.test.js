const component = 'sling-web-component-input';
const customCode = false;

module.exports = {
  main: (browser) => {
    const testValues = [
      'sling label',
      'sling disabled',
      'sling success',
      'sling warning',
      'sling error',
      '12.312.312/3123-12',
      '123.123.123-12',
      '(12) 1231-2312',
      '(12) 31231-2312',
      'john@doe.com',
      '12312-312',
    ];
    browser.url(`http://localhost:8777/${customCode ? 'regression' : ''}/index.html`)
      .execute(function (testValues) { //eslint-disable-line
        const inputList = document.querySelectorAll('sling-input');
        inputList.forEach((input, i) => {
          input.value = testValues[i];
        });
        return inputList;
      }, [testValues], function (inputList) {//eslint-disable-line
        inputList.value.forEach((input, i) => {
          browser.elementIdAttribute(input.ELEMENT, 'value', (inputValue) => {
            browser.assert.equal(inputValue.value, testValues[i]);
          });
        });
      })
      .saveScreenshot(`./reports/${component}/${component}.png`)
      .end();
  },
};
