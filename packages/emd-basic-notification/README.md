# Button

Emerald Notification UI component.

## Usage

```html
<emd-notification mode="alert">
  Alert message
  <button slot="action">Confirm</button>
</emd-notification>

<emd-notification mode="success">
  Success message
</emd-notification>

<emd-notification mode="danger">
  Danger message
</emd-notification>
```

## Attributes and Properties

#### `view`

Controls the component layout. It can be `default` or `compact`. Defaults to `default`.

- Type: String
- Attribute and property

#### `mode`

Controls the component appearance according to its goal. It can be `alert`, `success` or `danger`. Defaults to `alert`.

- Type: String
- Attribute and property

## CSS Parts

#### `wrapper`

Styles the element that wraps the content.

- Default:

```css
emd-notification::part(wrapper) {
  background: #fff;
  border-width: 1px 1px 1px 10px;
  border-style: solid;
  border-radius: 4px 10px 10px 4px;
  padding: 30px;
}
```

#### `icon`

Styles the icon's SVG.

- Default:

```css
emd-notification::part(icon) {
  display: block;
  width: 44px;
  margin-right: 44px;
  fill: currentColor;
}
```

## Slots

#### Default

The component's content. Usually some text.

#### `action`

The component's area for action buttons.
