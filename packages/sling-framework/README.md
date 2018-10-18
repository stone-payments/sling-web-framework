# Sling Framework

The Sling Framework provides the building blocks to create Sling-based web components:

* `SlingElement` — A class based on Google's [LitElement](https://github.com/Polymer/lit-element) that provides basic attribute and property handling and reflecting and automatic rendering.

* `html` — A tagged template literal utility from [lit-html](https://polymer.github.io/lit-html/) that provides an expressive API to dynamically generate html that reacts effectively to the component's state.

* `withRequest` – A decorator that brings methods, variables and events for handling API requests.

* `withSetState` – A decorator that exposes a method that behaves much like [React's `setState`](https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly).


## SlingElement and html

### Starting

We start by installing `sling-framework` from npm.

```bash
npm install --save sling-framework
```

Then we import SlingElement and html.

```javascript
import { SlingElement, html } from 'sling-framework';
```

Every web component is a javascript class that extends `HTMLElement`. In our case, we extend `SlingElement`, which enhances `HTMLElement` with new behaviour.

We will build a Star Rating component.

We start by declaring a `StartRating` class that extends `SlingElement`.

```javascript
class StartRating extends SlingElement {}
```

Then, in the constructor, we initialize any properties that the component might need. In our case, we will initialize the `rate` property with the value zero.

```javascript
class StartRating extends SlingElement {
  constructor() {
    super();
    this.rate = 0;
  }
}
```

### Declaring properties

Next, we need to tell the component how to handle the `rate` property: 

- what value type it will receive;
- if the value can be set by an html attribute or not;
- and how the component should react when its value changes.

We do that by declaring a static getter called `properties`.

```javascript
class StartRating extends SlingElement {
  // ommited code

  static get properties() {
    return {
      rate: {
        type: Number,
        reflectToAttribute: true,
        observer: 'restrictRate',
      },
    };
  }
}
```

#### `type: Number`

In the example, we are telling the component that the `rate` property is of type Number. The type can be any javascript primitive like Boolean or String.

#### `reflectToAttribute: true`

We are instructing the component that the `rate` property can be passed throught javascript and html.

```html
<!-- Passing rate throught html -->
<star-rating rate="4"></star-rating>
```

```javascript
// Passing rate throught javascript
const starRatingElement = document.querySelector('star-rating');
starRatingElement.rate = 4;
```

If set to false, `reflectToAttribute` tells the component that the property can only be passed throught javascript. This is useful when dealing with complex values like objects or arrays. We usually don't want this kind of values being passed throught html.

#### `observer: 'restrictRate'`

Finally, we instruct the component to call a method called `restrictRate` every time the `rate` value changes.

Note that SlingElement will **always** call the `render` method every time a declared property changes.

### Reacting to property changes

```javascript
class StartRating extends SlingElement {
  // ommited code

  restrictRate(newRate) {
    if (newRate < 1 || newRate > 5) {
      this.rate = Math.max(0, Math.min(5, newRate));
    }
  }
}
```
