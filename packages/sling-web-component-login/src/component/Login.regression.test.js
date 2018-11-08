const component = 'sling-web-component-login';
const customCode = false;

module.exports = {

  main: (browser) => {
    const testValues = {
      email: 'john@doe.com',
      password: 'password',
    };

    browser.url(`http://localhost:8777/${customCode ? 'regression' : ''}/index.html`)
      .saveScreenshot(`./reports/${component}/${component}-start.png`)
      .execute(function (testParams) {
        const email = document.querySelector('sling-login').shadowRoot
          .querySelector('sling-input[id="email"]');
        email.value = testParams.email;
        const password = document.querySelector('sling-login').shadowRoot
          .querySelector('sling-input[id="pw"]');
        password.value = testParams.password;
        return { email, password };
      }, [testValues], function (form) {
        browser.elementIdAttribute(form.value.email.ELEMENT, 'value',
          (result) => {
            browser.assert.equal(result.value, testValues.email);
          });
        browser.elementIdAttribute(form.value.password.ELEMENT, 'value',
          (result) => {
            browser.assert.equal(result.value, testValues.password);
          });
      })
      .saveScreenshot(`./reports/${component}/${component}-end.png`)
      .end();
  },
};
