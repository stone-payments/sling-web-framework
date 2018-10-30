const selenium = require('selenium-download');
const path = require('path');

selenium.ensure(path.join(__dirname, 'bin'), () => {
  process.exit(0);
});
