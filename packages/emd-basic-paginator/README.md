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

##### Without `total`
The Component takes the Arrows only mode.

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

When `total` is not assigned.
Depending on which arrow you click

```javascript
{
  type: "previous",
}
```

OR

```javascript
{
  type: "next",
}
```

