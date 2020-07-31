# Button

Emerald Button UI component.

## Usage

```html
<emd-button>
  Click me
</emd-button>

<emd-button>
  <emd-icon icon="arrow-up"></emd-icon>
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

Controlls the internal padding of the button.

- Default: `1.125em 1.5em`

## Slots

#### Default

The component's content. Usually some text, but it can also be an image or an icon, for example.

## Events

This component dispatches all native Button events, like `click`, for example.
