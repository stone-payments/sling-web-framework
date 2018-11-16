const component = 'sling-web-component-paginator';
const customCode = false;

module.exports = {

  main: (browser) => {
    browser.url(`http://localhost:8777/${customCode ? 'regression' : ''}/index.html`)
      .execute(function () {
        const paginatorList = document.querySelectorAll('sling-paginator');
        let labelButtonsList = [];
        const leftArrows = [];
        const rightArrows = [];
        paginatorList.forEach((paginator) => {
          const Arrowbuttons = paginator.shadowRoot
            .querySelectorAll('.emd-pag__button_type_arrow');
          leftArrows.push(Arrowbuttons[0]);
          rightArrows.push(Arrowbuttons[1]);

          const labelButtons = [].slice.call(paginator.shadowRoot
            .querySelectorAll('.emd-pag__button_type_label'));
          labelButtonsList = labelButtonsList.concat(labelButtons);
        });

        return { leftArrows, rightArrows, labelButtons: labelButtonsList };
      }, [], function (result) {
        // clicks all right arrows, several times
        result.value.rightArrows.forEach((arrow) => {
          for (let i = 0; i < 15; i += 1) {
            browser.elementIdClick(arrow.ELEMENT);
          }
        });

        // clicks all left arrows, several times
        result.value.leftArrows.forEach((arrow) => {
          for (let i = 0; i < 15; i += 1) {
            browser.elementIdClick(arrow.ELEMENT);
          }
        });
      })
      .saveScreenshot(`./reports/${component}/${component}.png`)
      .end();
  },
};
