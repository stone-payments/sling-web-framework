# Button

Emerald Pin Code UI component.

## Usage

```html
<emd-pin-code cases="4"></emd-pin-code>

<emd-pin-code cases="6" forceuppercase></emd-pin-code>

<emd-pin-code cases="6" type="number"></emd-pin-code>

<emd-pin-code cases="4" value="AB24"></emd-pin-code>
```

## Attributes and Properties

#### `cases`

Controls the number of cases. It should be a positive integer and defaults to `1` if any invalid value is passed.

- Type: Number
- Attribute and property

#### `forceuppercase`

Forces characters to be passed as uppercase. Defaults to `false`.

- Type: Boolean
- Attribute and property

#### `type`

Controls the type of the cases. Can be `number`, `text` or `password`. Defaults to `text`.

- Type: String
- Attribute and property

#### `value`

Controls the value of the cases. As an attribute, it will only be read once during initialization, just like the native Input element. As a property, it can be set or read at any time.

- Type: String
- Attribute and property

## CSS Parts

#### `wrapper`

Styles the element that wraps the cases.

- Default:

```css
emd-pin-code::part(wrapper) {
  display: grid;
  grid-column-gap: 0.5em;
}
```

#### `case`

Styles all cases at the same time.

- Default:

```css
emd-pin-code::part(case) {
  background: #FFFFFF;
  border: 2px solid #D6DDE4;
  border-radius: 5px;
  font-family: inherit;
  font-style: normal;
  font-weight: bold;
  font-size: 1em;
  text-align: center;
  padding: 0.3125em 0.25em;
  color: inherit;
  background: white;
  -webkit-appearance: none;
  width: 1em;
}
```

## Events

This component dispatches all native Input events, like `input`, for example, and also:

#### `complete`

Dispatched every time all cases are filled.

- Detail:

```js
{
  value: 'AB24'
}
```