# Tooltip 

Emerald Tooltip UI component.

## Usage

```
npm install @stone-payments/emd-basic-tooltip
```

```js
import '@stone-payments/emd-basic-tooltip';
```

```html
<span id="target">120 members found</span>
<emd-tooltip for="target">79 online now</emd-tooltip>
```

## Attributes and Properties

#### `position`

The tooltip position relative to the target element. It can be `top`, `bottom`, `left` or `right`. Defaults to `right` if unset.

- Type: String
- Attribute and property

#### `for`

The id of the target element. The tooltip **must be a sibling** of the target element.

- Type: String
- Attribute and property

#### `delay`

The delay of the fade effect in milliseconds. Defaults to zero if unset.

- Type: Number
- Attribute and property

#### `shadow`

Shows the tooltip shadow. Defaults to `false`.

- Type: Boolean
- Attribute and property


## CSS Properties

#### `--emd-tooltip-background-color`

Defines the background color of the tooltip.

- Default: `#0c1219`

#### `--emd-tooltip-border-color`

Defines the border color of the tooltip.

- Default: `--emd-tooltip-background-color` or `#0c1219`

#### `--emd-tooltip-border-radius`

Defines the border radius of the tooltip.

- Default: `6px`

#### `--emd-tooltip-font-size`

Defines the font size of the text.

- Default: `0.75em`

#### `--emd-tooltip-width`

Defines the width of the tooltip.

- Default: `max-content`

#### `--emd-tooltip-padding`

Defines the padding of the tooltip.

- Default: `calc(0.75em - 2px)`

#### `--emd-tooltip-text-align`

Defines the text alignment.

- Default: `left`

#### `--emd-tooltip-text-color`

Defines the text color.

- Default: `#fff`
