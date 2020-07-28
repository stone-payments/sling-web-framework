# Brand Icon

Emerald Brand Icon UI component.

## Usage

```
npm install @stone-payments/emd-basic-brand-icon
```

```js
import '@stone-payments/emd-basic-brand-icon';
```

```html
<emd-brand-icon icon="amex"></emd-icon>
<emd-brand-icon iconid="9"></emd-icon>
```

## Attributes and Properties

#### `icon`

Selects a brand from the library by its name.

The component does its best to map the string to the correct brand. For example: "Amex", "American-express", "American Express", "AmericanExpress Debit" and "Amex Credit" will all map to the American Express brand.

- Type: String
- Attribute and property

#### `iconid`

Selects a brand from the library by its id.

- Type: String
- Attribute and property

#### `nofallback`

By default, the Stone brand will be shown if a given brand is not recognized. This attribute tells the component not to show anything instead.

- Type: Boolean
- Attribute and property