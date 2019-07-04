# Contributing

## Cloning the project

```
git clone git@github.com:stone-payments/emerald-web-framework.git
cd emerald-web-framework
```

## Starting a new branch

```
git checkout emd-develop
git pull
git checkout -b branch-name
```

*We are using `emd-master` and `emd-develop` branches since `master` and `develop` are deprecated for now. In the future, we will rename our branches so that `master` and `develop` can be used again.*

## Installing

```
npm install
```

## Creating a new component

This command will create a new folder with a component example and all its necessary files and folders.

```
npm run create-component "Component Name" -- --type=basic
```

## Starting the development environment

```
npm start emd-basic-component-name
```

## Testing

Tests should be written in `*.spec.js` files in the same folder of the tests' subjects.

### Running all tests

*This will also generate coverage reports.*

```
npm test
```

### Running tests for an specific component

```
npm test emd-basic-component-name
```

## Commiting

We use [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) to automatically manage component versions and generate Changelogs. Semantic Release analyzes commit messages in the CI environment to determine:

* which components have changed since the last release;
* which version each changed component should have;
* what changes should be written to the Changelogs.

As [explained in the documentation](https://semantic-release.gitbook.io/semantic-release/#commit-message-format), commit messages starting with `fix`, `feat`, `perf` or `BREAKING CHANGE` will update the versions and the Changelogs of each component altered by a commit. Some [prefixes do not trigger actions](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type), like: `build`, `chore`, `ci`, `docs`, `refactor`, `style` and `test`.

| Commit message | Release type |
|:---|:---|
| **fix:** stop graphite breaking when too much pressure applied | Patch Release |
| **feat:** add 'graphiteWidth' option | ~~Minor~~ Feature Release |
| **perf:** remove graphiteWidth option | ~~Major~~ Breaking Release |
| **BREAKING CHANGE:** The graphiteWidth option has been removed. | ~~Major~~ Breaking Release |
