const component = 'sling-web-component-form';
const customCode = false;

module.exports = {

  main: (browser) => {
    const testValues = {
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '(21) 12345-6789',
      cpf: '123.456.789-12',
      cnpj: '12.345.678/9012-34',
    };

    browser.url(`http://localhost:8777/${customCode ? 'regression' : ''}/index.html`)
      .execute(function () {
        document.querySelector('sling-button').click();
      }, []);
    Object.keys(testValues).forEach((key) => {
      browser.getAttribute(`sling-input[name="${key}"]`, 'validationstatus', (input) => {
        browser.assert.equal(input.value, 'error');
      });
    });
    browser.saveScreenshot(`./reports/${component}/${component}-invalid.png`)
      .execute(function (testValuesParams) {
        document.querySelector('sling-input[name="name"]')
          .value = testValuesParams.name;
        document.querySelector('sling-input[name="email"]')
          .value = testValuesParams.email;
        document.querySelector('sling-input[name="phone"]')
          .value = testValuesParams.phone;
        document.querySelector('sling-input[name="cpf"]')
          .value = testValuesParams.cpf;
        document.querySelector('sling-input[name="cnpj"]')
          .value = testValuesParams.cnpj;
      }, [testValues], function () {
        Object.keys(testValues).forEach((key) => {
          browser.getAttribute(`sling-input[name="${key}"]`, 'validationstatus', (input) => {
            browser.assert.equal(input.value, null);
          });
        });
      })
      .saveScreenshot(`./reports/${component}/${component}.png`)
      .end();
  },
};
