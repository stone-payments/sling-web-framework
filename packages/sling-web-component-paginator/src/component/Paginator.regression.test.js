module.exports = {

  main: (browser) => {
    browser.url('http://localhost:8080/')
      /* eslint-disable */
      .execute(function () {
        let paginatorList = document.querySelectorAll('sling-paginator')
        let labelButtonsList = []
        let leftArrows = []
        let rightArrows = []
        paginatorList.forEach(paginator => {
          let Arrowbuttons = paginator.shadowRoot.querySelectorAll('.emd-pag__button_type_arrow')
          leftArrows.push(Arrowbuttons[0])
          rightArrows.push(Arrowbuttons[1])

          let labelButtons = [].slice.call(paginator.shadowRoot.querySelectorAll('.emd-pag__button_type_label'))
          labelButtonsList = labelButtonsList.concat(labelButtons)
        })

        return { 'leftArrows': leftArrows, 'rightArrows': rightArrows, 'labelButtons': labelButtonsList }
      }, [], function (result) {
        // clicks all right arrows several times
        result.value.rightArrows.forEach(arrow => {
          for (let i = 0; i < 15; i++) {
            browser.elementIdClick(arrow.ELEMENT);
          }
        });

        // clicks all left arrows several times
        result.value.leftArrows.forEach(arrow => {
          for (let i = 0; i < 15; i++) {
            browser.elementIdClick(arrow.ELEMENT);
          }
        });

        // clicks all labels several times
        result.value.labelButtons.forEach(labelButton => {
          browser.elementIdClick(labelButton.ELEMENT);
        });
      });

    /* eslint-enable */
    browser.saveScreenshot('./reports/paginator.png')
      .end();
  },
};
