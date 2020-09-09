# Button

Emerald Button UI component.

## Usage

```
npm install @stone-payments/emd-basic-button
```

```js
import '@stone-payments/emd-basic-button';
```

```html
<emd-button abc>
  Click me
</emd-button>

<emd-button abc size="large" rank="secondary">
  Click me
</emd-button>

<emd-button>
  Click me
</emd-button>

<emd-button>
  <emd-icon slot="icon" icon="arrow-up"></emd-icon>
  Move up
</emd-button>

<emd-button loading>
  Buy now
</emd-button>

<emd-button href="http://stone.co">
  Stone Co.
</emd-button>
```

## Attributes and Properties

#### `abc`

Applies the ABC theme to the component. The ABC mode intentionally restricts the styles that can be applied to the component. Font size, color and background can only be changed through `size` and `rank` properties in ABC mode.

- Type: Boolean
- Attribute and property

#### `size`

Changes the size of the component when in ABC mode. It can be `large`, `medium` or `small`.

- Type: String
- Attribute and property

#### `rank`

Changes the appearance of the component when in ABC mode. It can be `primary`, `secondary` or `tertiary`.

- Type: String
- Attribute and property

#### `type`

Defines the type of the component. It can be: `button`, `submit` or `reset`. This attribute is passed to the `<button>` element inside the component.

- Type: String
- Attribute and property

#### `disabled`

Disables the component.

- Type: Boolean
- Attribute and property

#### `loading`

Shows a loading spinner inside the component.

- Type: Boolean
- Attribute and property

#### `href`

Makes the component behave like an `<a>` tag.

- Type: String
- Attribute and property

#### `target`

Defines the tab where the url set in the `href` attribute will be loaded.

- Type: String
- Attribute and property

#### `multipleclicks`

Allows the component to recognize multiple clicks in a row. By default, when clicked multiple times in a row, the component will only recognize the first click.

- Type: Boolean
- Attribute and property

## CSS Properties

#### `--emd-button-padding`

Controlls the internal padding of the button. This property doesn't work in ABC mode.

- Default: `1.125em 1.5em`

## Slots

#### Default

The component's content. Usually some text, but it can also be an image or an icon, for example.

#### `icon`

The area on the left to the content where the optional icon goes.

## Events

This component dispatches all native Button events, like `click`, for example.
