module.exports = {
    main: (browser) => {
        browser.url('http://localhost:8080/')
        .execute(function (data) {

            var labels = [
                'sling label',
                'sling disabled',
                'sling success',
                'sling warning',
                'sling error',
                '123.123.12312/312',
                '123.123.123-12',
                '(12) 1231-2312',
                '(12) 31231-2312',
                'abc@def.com',
                '12312-312'
            ];

            document.querySelectorAll('sling-input')[0].shadowRoot.querySelector('input').value = labels[0]
            document.querySelectorAll('sling-input')[1].shadowRoot.querySelector('input').value = labels[1]
            document.querySelectorAll('sling-input')[2].shadowRoot.querySelector('input').value = labels[2]
            document.querySelectorAll('sling-input')[3].shadowRoot.querySelector('input').value = labels[3]
            document.querySelectorAll('sling-input')[4].shadowRoot.querySelector('input').value = labels[4]
            document.querySelectorAll('sling-input')[5].shadowRoot.querySelector('input').value = labels[5]
            document.querySelectorAll('sling-input')[6].shadowRoot.querySelector('input').value = labels[6]
            document.querySelectorAll('sling-input')[7].shadowRoot.querySelector('input').value = labels[7]
            document.querySelectorAll('sling-input')[8].shadowRoot.querySelector('input').value = labels[8]
            document.querySelectorAll('sling-input')[9].shadowRoot.querySelector('input').value = labels[9]
            document.querySelectorAll('sling-input')[10].shadowRoot.querySelector('input').value = labels[10]

            return labels
        }, [], function(result) {
            browser.assert.equal(result.value[0], 'sling label')
            browser.assert.equal(result.value[1], 'sling disabled')
            browser.assert.equal(result.value[2], 'sling success')
            browser.assert.equal(result.value[3], 'sling warning')
            browser.assert.equal(result.value[4], 'sling error')
            browser.assert.equal(result.value[5], '123.123.12312/312')
            browser.assert.equal(result.value[6], '123.123.123-12')
            browser.assert.equal(result.value[7], '(12) 1231-2312')
            browser.assert.equal(result.value[8], '(12) 31231-2312')
            browser.assert.equal(result.value[9], 'abc@def.com')
            browser.assert.equal(result.value[10], '12312312')
        })
        browser.saveScreenshot('./reports/input.png')
        .end();
    },
};
