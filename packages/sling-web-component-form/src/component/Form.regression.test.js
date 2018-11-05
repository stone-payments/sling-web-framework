module.exports = {

  main: (browser) => {
    const testValues = {
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '(21) 12345-6789',
      cpf: '123.456.789-12',
      cnpj: '12.345.678/9012-34',
    };

    browser.url('http://localhost:8080/')
      /* eslint-disable */
      .execute(function () {
        document.querySelector('sling-button').click()
      }, []);
    /* eslint-enable */
    Object.keys(testValues).forEach((key) => {
      browser.getAttribute(`sling-input[name="${key}"]`, 'validationstatus', (input) => {
        browser.assert.equal(input.value, 'error');
      });
    });
    browser.saveScreenshot('./reports/form-invalid.png')
      /* eslint-disable */
      .execute(function (testValues) {
        document.querySelector('sling-input[name="name"]').value = testValues.name
        document.querySelector('sling-input[name="email"]').value = testValues.email
        document.querySelector('sling-input[name="phone"]').value = testValues.phone
        document.querySelector('sling-input[name="cpf"]').value = testValues.cpf
        document.querySelector('sling-input[name="cnpj"]').value = testValues.cnpj
      }, [testValues], function (result) {
        Object.keys(testValues).forEach((key) => {
          browser.getAttribute(`sling-input[name="${key}"]`, 'validationstatus', (input) => {
            browser.assert.equal(input.value, null);
          });
        });
      })
      /* eslint-enable */
      .saveScreenshot('./reports/form.png')
      .end();
  },
};
