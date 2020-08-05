# Button

Emerald Slideshow UI component.

## Usage

```
npm install @stone-payments/emd-basic-slideshow
```

```js
import '@stone-payments/emd-basic-slideshow';
```

```html
<emd-slideshow current="2">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
</emd-slideshow>
```

## Attributes and Properties

#### `current`

Sets the current slide and trigger the transition. Defaults to `1`.

- Type: Number
- Attribute and property

#### `delay`

The delay of the transition in milliseconds. Defaults to `300` if unset.

- Type: Number
- Attribute and property

## CSS Properties

#### `--emd-slideshow-gap`

Controlls the gap between slides.

- Default: `0px`

## Slots

#### Default

The slide's container. Each component's child element becomes a slide.

## Events

#### `slidechange` (alias `slidechangestart`)

Dispatched when the current slide changes but before the animation begins.

- Detail:

```javascript
{
  previous: 2,
  current: 3
}
```

#### `slidechangeend`

Dispatched after the current slide changes and the animation ends.

- Detail:

```javascript
{
  previous: 2,
  current: 3
}
```