fixture`Getting Started`
  .page`http://localhost:8080/`;

test('My first test', async (t) => {
  await t
    .takeScreenshot('brand-icon.jpg');
});

