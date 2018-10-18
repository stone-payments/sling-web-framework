# Sling Framework

The Sling Framework provides the building blocks to create Sling-based web components:

* `SlingElement` — A class based on Google's [LitElement](https://github.com/Polymer/lit-element) that provides basic attribute and property handling and reflecting and automatic rendering.

* `html` — A tagged template literal utility from [lit-html](https://polymer.github.io/lit-html/) that provides an expressive API to dynamically generate html that reacts effectively to the component's state.

* `withRequest` – A decorator that brings methods, variables and events for handling API requests.

* `withSetState` – A decorator that exposes a method that behaves much like [React's `setState`](https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly).
