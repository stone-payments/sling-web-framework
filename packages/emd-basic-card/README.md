# Card

Emerald Card UI component.

## Usage

```
npm install @stone-payments/emd-basic-card
```

```js
import '@stone-payments/emd-basic-card';
```

```html
<emd-card>
  <user-details></user-details>
</emd-card>

 <emd-card>
  <h4 slot="header">User Details</h4>
  <emd-icon slot="header-extra" icon="close"></emd-icon>
  <user-details></user-details>
  <p slot="footer">Updated one hour ago</p>
</emd-card>
```

## Attributes and Properties

#### `expandedbody`

Controls whether the content has a margin of 20px.

- Type: Boolean
- Attribute and property

#### `noscroll`

Prevents the component from scrolling the content, which happens by default. When `noscroll` is used, the content itself becomes responsible for scrolling.

- Type: Boolean
- Attribute and property

## CSS Properties

#### `--emd-card-header-background`

Sets the Card header's background.

- Default: `transparent`

#### `--emd-card-body-background`

Sets the Card body's background.

- Default: `transparent`

#### `--emd-card-footer-background`

Sets the Card footer's background.

- Default: `transparent`

## Slots

#### Default

The component's content. Usually another component, but it can be anything.

#### `header`

The component's header, at the top.

#### `header-extra`

The component's area for action buttons, i.e. a close icon, at the top-right corner.

#### `footer`

The component's header, at the bottom.