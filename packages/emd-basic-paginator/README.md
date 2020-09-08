# Paginator

Emerald Paginator UI component.

## Usage

```
npm install @stone-payments/emd-basic-paginator
```

```js
import '@stone-payments/emd-basic-paginator';
```

```html
<emd-paginator></emd-paginator>

<emd-paginator total="20" selected="1"></emd-paginator>
```

## Attributes and Properties

#### `total`

Gives total of pages.

- Type: Number
- Attribute and property

#### `selected`

Displays the current page.

- Type: Number
- Attribute and property

## Events

#### `paginate`

Dispatched when current page changes.

- Detail:
  
```javascript
{
  type: "index",
  index: 2
}
```
