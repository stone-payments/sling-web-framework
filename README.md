# Sling Web
[![Build Status](https://travis-ci.org/stone-payments/sling-web-framework.svg?branch=master)](https://travis-ci.org/stone-payments/sling-web-framework) [![Coverage Status](https://coveralls.io/repos/github/stone-payments/sling-web-framework/badge.svg?branch=task%2FCMPDC-909)](https://coveralls.io/github/stone-payments/sling-web-framework?branch=task%2FCMPDC-909)

## Technologies
  - [Babel](https://babeljs.io/)
  - [Chai](https://www.chaijs.com/)
  - [EsLint](https://eslint.org/), rules extends [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
  - [Karma](https://karma-runner.github.io)
  - [Lerna](https://lernajs.io/)
  - [Mocha](https://mochajs.org/)
  - [RollUp](https://rollupjs.org/guide/en)
  - [Sinon](https://sinonjs.org/)
  - [TestCafé](http://devexpress.github.io/testcafe/)
  - [Webpack](https://webpack.js.org/)

## Usage

#### Node
v8.x.x >= v8.9.0

#### Npm
v6.x.x >= v6.4.0

## Available scripts

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

#### Build
`npm run build` or `npm run build component-name`

Generates the distribution folders of all components. If a component name is passed as parameter, it only generates the distribution folder for that specific component.

#### Server
`npm run server` or `npm run server component-name`

Starts a static server, allowing you to navigate through stand-alone, browser-specific versions of all components. If a component name is passed as parameter, the server will open on that component's folder, otherwise, it will open on the project's root folder.

Note that this command depends on `npm run build` to be run first, in order to generate the components' distribution files.

By appending `?es=6` or `?es=5` to the end of URL, you can choose which EcmaScript version is used by the component (either 5 or 6 are allowed).

## [Contribute](.github/CONTRIBUTING.md)
