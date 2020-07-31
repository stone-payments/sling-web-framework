# Money

Emerald Money UI component.

## Usage

```html
<emd-money value="12680.9"></emd-money>

<emd-money value="12680.9" hidevalue></emd-money>

<emd-money value="12680.9" currency="EUR" hidepositivesign></emd-money>
```

## Attributes and Properties

#### `value`

Defines the numeric value to be displayed. The component uses `Intl.NumberFormat` API to round values.

- Type: Number
- Attribute and property

#### `currency`

Defines the currency to be displayed. It can be `BRL`, `USD` or `EUR`.

- Type: String
- Attribute and property

#### `hidevalue`

Hides the value with a rectangle.

- Type: Boolean
- Attribute and property

#### `hidepositivesign`

Hides the positive sign before the value. The negative sign cannot be hidden.

- Type: Boolean
- Attribute and property

## CSS Properties

#### `--emd-money-positive-color`

Defines the color of positive values.

- Default: `inherit`

#### `--emd-money-neutral-color`

Defines the color of values equal to zero.

- Default: `inherit`

#### `--emd-money-negative-color`

Defines the color of negative values.

- Default: `inherit`

#### `--emd-money-effect-color`

Defines the color of the rectangle that hides the value.

- Default: `currentColor`

#### `--emd-money-effect-opacity`

Defines the opacity of the rectangle that hides the value.

- Default: `0.5`