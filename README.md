# Sling Web  
[![Build Status](https://travis-ci.org/stone-payments/sling-web-framework.svg?branch=master)](https://travis-ci.org/stone-payments/sling-web-framework) [![Coverage Status](https://coveralls.io/repos/github/stone-payments/sling-web-framework/badge.svg?branch=task%2FCMPDC-909)](https://coveralls.io/github/stone-payments/sling-web-framework?branch=task%2FCMPDC-909)

## Technologies  
  - [Lerna](https://lernajs.io/)
  - [Karma](https://karma-runner.github.io/2.0/index.html)
  - [EsLint](https://eslint.org/), rules extends [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
  - [RollUp](https://rollupjs.org/guide/en)
  
## Usage  

#### Node
v8.10.0

#### Install
`npm install`

Installs project dependencies.

#### Start  
`npm start component-name`

Starts the development server with webpack.

#### Test  
`npm test` or `npm test component-name`

Runs tests that depend on the DOM using Chrome Headless and generates a coverage report. If a component name is passed as parameter, the tests will run for that specific component but the coverage report will not be generated.

`npm run test-debug` or `npm run test-debug component-name`

Runs tests that depend on the DOM using Chrome. If a component name is passed as parameter, the tests will run for that specific component.

#### Spec  
`npm run spec` or `npm run spec component-name`

Runs tests that do not depend on the DOM using Mocha and generates a coverage report. If a component name is passed as parameter, the tests will run for that specific component but the coverage report will not be generated.

#### Server  
`npm run server`

Starts a static server at the root of the project, allowing one to navigate through the generated components. It is possible, for example, to visit the public folders of all basic components. To visit the Button component, the URL would be http://127.0.0.1:8080/packages/sling-web-component-button/public/.

By appending `?es=6` or `?es=5` to the end of URL, one can choose which version of the component to preview, which can be either ES5 ou ES6.

#### Build  
`npm run build` or `npm run build component-name`

Generates the distribution folders of all components. If a component name is passed as parameter, it only generates the distribution folder for that specific component.

## [Contribute](./CONTRIBUTING.md)
