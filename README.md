![node version][node-badge]
![npm version][npm-badge]
[![Build Status][build-status]][travis-url]
[![Coverage Status][coverage-status]][coveralls-url]
[![License][license-badge]][license-url]

# Sling Web Framework
Sling is a open-source framework that makes it easy to build top quality components for high-performance financial applications, made by [Stone Co](https://www.stone.com.br).

The `sling-web-framework` is totally based on vanilla [Web Components](https://www.webcomponents.org/introduction), allowing other projects, both internal and external, to use components without worrying about other frameworks or workflows.

### :sparkles: Getting started

Start using sling by following our quick guide about how to [create a basic component](https://github.com/stone-payments/sling-web-framework/wiki/Creating-a-new-basic-component) or see all the [available scripts](https://github.com/stone-payments/sling-web-framework/wiki/Available-Scripts) showing how to use our framework.

We would love to hear from you! If you have any feedback or run into issues using our framework, please file
an [issue](https://github.com/stone-payments/sling-web-framework/issues/new) on this repository.

### :rocket: Contributing
Thanks for your interest in contributing! Read up on our guidelines for
[contributing](https://github.com/stone-payments/sling-web-framework/blob/master/.github/CONTRIBUTING.md)
and then look through our issues with a [help wanted](https://github.com/stone-payments/sling-web-framework/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
label.

# Packages

All Sling Components are listed below. You can interactively browse your component library acessing your [Storybook][storybook-link] page.

### :black_heart: Core
The `sling-framework` package is essential for all of your components. With `sling-helpers` and `sling-assets`, they are part of the core of our framework. See the docs below:

* [sling-framework](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-framework)
* [sling-helpers](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-helpers)
* [sling-assets](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-assets)

### :card_file_box: Components
Right now all the basic components are available. See the docs of each one to know how to use it on your application:

* [sling-web-component-brand-icon](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-brand-icon)
* [sling-web-component-button](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-button)
* [sling-web-component-calendar](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-calendar)
* [sling-web-component-card](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-card)
* [sling-web-component-form](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-form)
* [sling-web-component-icon](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-icon)
* [sling-web-component-input](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-input)
* [sling-web-component-list](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-list)
* [sling-web-component-loader-wrapper](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-loader-wrapper)
* [sling-web-component-loader](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-loader)
* [sling-web-component-login](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-login)
* [sling-web-component-message](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-message)
* [sling-web-component-paginator](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-paginator)
* [sling-web-component-sdk-connect](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-sdk-connect)
* [sling-web-component-select](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-select)
* [sling-web-component-snackbar](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-snackbar)
* [sling-web-component-table](https://github.com/stone-payments/sling-web-framework/tree/master/packages/sling-web-component-table)

### :green_apple: Technologies
* [Babel](https://babeljs.io/)
* [Chai](https://www.chaijs.com/)
* [EsLint](https://eslint.org/) (rules extends [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb))
* [Karma](https://karma-runner.github.io)
* [Lerna](https://lernajs.io/)
* [Mocha](https://mochajs.org/)
* [RollUp](https://rollupjs.org/guide/en)
* [Sinon](https://sinonjs.org/)
* [TestCafé](http://devexpress.github.io/testcafe/)
* [Webpack](https://webpack.js.org/)

[node-badge]: https://img.shields.io/badge/node%20version-8.x.x-brightgreen.svg
[npm-badge]: https://img.shields.io/badge/npm%20version-6.x.x-blue.svg
[build-status]: https://travis-ci.org/stone-payments/sling-web-framework.svg?branch=master
[coverage-status]: https://coveralls.io/repos/github/stone-payments/sling-web-framework/badge.svg?branch=master
[license-badge]: https://badgen.net/github/license/stone-payments/sling-web-framework
[travis-url]: https://travis-ci.org/stone-payments/sling-web-framework
[coveralls-url]: https://coveralls.io/github/stone-payments/sling-web-framework
[license-url]: https://github.com/stone-payments/sling-web-framework/blob/master/LICENSE
[storybook-link]: https://sling-web-framework-storybook.now.sh
