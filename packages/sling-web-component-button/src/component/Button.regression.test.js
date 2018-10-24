fixture`Getting Started`
  .page`http://localhost:8080/`;

test('Screenshot', async (t) => {
  await t
    .takeScreenshot('button.jpg');
});
