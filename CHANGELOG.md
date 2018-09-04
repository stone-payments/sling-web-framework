# CHANGELOG

## [0.16.0] - 2018-09-03

### Added
- sling-sales-amount business component.
- Create new SlingBusinessElement.
- Basic component Loader Wrapper.


## [0.15.1] - 2018-08-24

### Changed
- Use imask from bundle.


## [0.15.0] - 2018-08-24

### Added
- sling-web-business-payment-status component.
- Add payment status to calendar business component.
- Prepay warning text in sales simulator business component.

### Fixed
- Tests for SalesReportExpanded.


## [0.14.1] - 2018-08-20

### Changed
- Update imask without node_modules.


## [0.14.0] - 2018-08-20

### Added
- Storage package.
- Aggregate sales business component.
- SalesReportExpanded business component.
- SalesReport business component.

### Changed
- Convert SDK request parameters to camelCase and update services.

### Fixed
- Rename `merchantsInterface` to `merchantInterface`.
- PaymentDetailsItem component on Firefox browsers.


## [0.13.2] - 2018-08-16

### Fixed
- Fix payment details summary component (total paid)


## [0.13.1] - 2018-08-15

### Fixed
- Added crossBalance=true for retrieving calendar payments.


## [0.13.0] - 2018-08-14

### Added
- Web analytics wiki.
- BubbleEvent method in withBusinessLogic.
- Sales report endpoint method in SDK.

### Fixed
- Merchant export in merchants module.

### Updated
- Payments and merchant models to new response.
- Payments and merchant models tests.

### Changed
- A few SDK methods to make it consistent with other platforms.

### Removed
- Ignore src/ in all .npmignore.


## [0.12.0] - 2018-08-09

### Added
- v0 payload module interfaces.
- Nullable and arrayOf validation methods.

### Updated
- MatchesInterface method.
- Actions to use new SDK.
- SDK actions.
- Change maping on payment details, from product type name to wallet type name.
- Title of other wallets in PaymentDetailsSummary to `Diversos`.
- Description of detail item uses walletTypeName now.

### Removed
- Action tests.


## [0.11.1] - 2018-08-06

### Fixed
- Removed card wrapper from sales simulator business component.


## [0.11.0] - 2018-08-02

### Added
- Sales Simulator business component.

### Fixed
- Fix loading flicker.
- Changed maping on payment details, from product type name to wallet type name.


## [0.10.1] - 2018-07-31

### Fixed
- Payment Operations pagination bug.


## [0.10.0] - 2018-07-26

### Added
- LitElement and moment bundle.
- Snackbar component.
- Icon component.
- Button attribute “slim”.

### Removed
- LitElement and moment imports.


## [0.9.0] - 2018-07-24

### Added
- New SDK interface.

### Fixed
- Merchant fees and transaction profiles (GET) methods.
- New SDK interface.
- GroupByDeep method was breaking when it received an undefined parameter.

### Changed
- Label in Payment Details ("Saldo do dia" to "Saldo").


## [0.8.0] - 2018-07-20

### Added
- Total amount in payment-details-item.

### Removed
- Lodash dependencies.


## [0.7.1] - 2018-07-19

### Fixed
- Bug that made Payment Details show an incorrect total value.


## [0.7.0] - 2018-07-17

### Added
- Test files for untested components.
- Possibility of running a single test.

### Fixed
- Bug revelead by SonarQube where a method was being called with a parameter but it didn't receive parameters.

## Changed
- Adapt SDK Transactions & Payments domains
- Use redux bundle for ES6 compatibility


## [0.6.0] - 2018-07-12

### Added
- Roboto font to business merchant info component

### Fixed
- Force eslint-scope to use version 3.7.1 [for security reasons](https://github.com/eslint/eslint-scope/issues/39).
- Adjust Button Basic Component for Emerald layout directions.

### Changed
- Movement category prepay name now is prepay fee.


## [0.5.0] - 2018-07-06

### Changed
- Payments Detail Summary Component now shows total paid.

### Fixed
- Phone mask on Table Basic component


## [0.4.0] - 2018-06-29

### Added
- Add editing behaviour to some business components.


## [0.3.3] - 2018-06-29

### Added
- Allow merchant info business component to set list as cascade or default.
- Phone mask in table basic component.
- Add Edit Column to Table Basic component.
- Message Basic Component.
- Error Handling from SDK.
- Form basic component.

### Fixed
- List Basic Component layout for compliance with Emerald styles.
- Date/time related bugs.
- Payment operation pagination.
- Merchant and Payment SDK contracts.


## [0.3.2] - 2018-06-15

### Fixed
- SDK on Firefox and Microsoft Edge.


## [0.3.1] - 2018-06-14

### Fixed
- Removed dependency that was unavailable in production and broke the Table component.


## [0.3.0] - 2018-06-14

### Fixed
- Cross browser compatibility (Firefox and Microsoft Edge).


## [0.2.36] - 2018-06-05

### Fixed
- Display data in summary card from Payment Details business component.
- Adjust payment model product type formatter to correct return empty string when datasource has no field.


## [0.2.35] - 2018-06-04

### Fixed
- Make Payment Operations' `rowclicked` event pass through the Shadow DOM.


## [0.2.34] - 2018-06-04

### Fixed
- Correct css file reference in Payment Details.


## [0.2.33] - 2018-05-31

### Fixed
- Bug with events that broke Payment Details.


## [0.2.32] - 2018-05-31

### Added
- Collapsing behaviour to Paginator.
- Add Payment Operations Business Component.
- Add Scroll behavior to body of Card Basic Component.
- Payment Details - Sum Values by Wallet Type Id.

### Fixed
- Adjust input Basic Component for Emerald layout directions.


## [0.2.31] - 2018-05-30

### Fixed
- Set `apiurl` for the Payment Details items and summary.
- The `apiurl` attribute must be lowercase.


## [0.2.30] - 2018-05-30

### Fixed
- SDK bundle.


## [0.2.29] - 2018-05-30

### Added
- Add apiUrl as business element attribute.


## [0.2.28] - 2018-05-29

### Fixed
- Adjust Table Basic component for more rich text and value cell formatters.
- Adjust Card Basic Component for Emerald layout directions.
- Change Brand Icons Basic component for correct id mapping.


## [0.2.26] - 2018-05-28

### Fixed
- Added missing wallet_type_id to domain table.
- Payment Details layout.


## [0.2.25] - 2018-05-25

### Fixed
- Payment Details CSS adjustments.


## [0.2.24] - 2018-05-25

### Fixed
- The build process generates bundles again.
- Styles in card basic component.


## [0.2.23] - 2018-05-25

### Fixed
- The build process no longer generates bundles.
- Styles in table basic component.

### Added
- Payment Details business component.
- Payment Details Item business component.
- Payment Details Summary business component.
- New formaters in table component.


## [0.2.22] - 2018-05-22

### Fixed
- Fixed Loader that was breaking when the instance id was not provided.
- Moved `bindActionCreatrs`, `moment` and `imask` to bundled files.

### Added
- Payments Calendar Status tooltip

### Removed
- Payments Calendar Status inferior helper


## [0.2.21] - 2018-05-21

### Fixed
- Fixed `npm start`.


## [0.2.20] - 2018-05-21

### Fixed
- Fixed Lodash dependencies.
- The SDK is now distributed as a bundled file.

## [0.2.19] - 2018-05-18

### Fixed
- Fixed circular dependencies.


## [0.2.18] - 2018-05-18

### Fixed
- Refactored SlingBusinessElement.
- Refactored connectHelper.
- Fixed a bug on onSdkAvailable that broke getdata on business components.
- Fixed a bug in the Payments Calendar to proper model the API response considering groups by date **and** settlement_status_id.

### Added
- Payment Details Business Component.
- Paginator component.
- Calendar component.
- Loader basic component.
- Attribute that hides Table components' headers.
- Attribute that allows rows to be clicked and dispatch events.

### Removed
- Business Component's Controllers.
- Global Loader.


## [0.2.17] - 2018-05-04

### Fixed
- Fixed inaccurate coverage report in Windows environments.

### Added
- Created connectReducers function.
- Added sinon dependency.


## [0.2.16] - 2018-04-30

### Added
- First business components.
- First basic components.
- SDK.
