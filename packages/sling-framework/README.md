# Sling Framework

The Sling Framework provides the building blocks to create Sling-based web components:

* `SlingElement` — A class based on Google's [LitElement](https://github.com/Polymer/lit-element) that should be extended instead of using `HTMLElement`.

* `html` — A tagged template literal utility, [developed by Google](https://polymer.github.io/lit-html/), that provides an expressive API to dynamically generate html that react effectively to the component's state changes.

* `withRequest` – A decorator that provides methods, variables and events for handling API requests.

* `withSetState` – A decorator that provides a `setState` method that behaves much like [React's](https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly).
