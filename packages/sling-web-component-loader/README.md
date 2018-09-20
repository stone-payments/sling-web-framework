# sling-web-component-loader

The loader Component. It´s aimed to be used in pair with business components that demands requests and component renders with processess delays.
The component must show the loader element while loading the data source required to populate and render his view.

This component renders a card element with the merchant contacts information within. It table basic components as content wrapper.

## Usage
This is how you set the loader into the business component script structure
In the business component script, the RENDER method must be made as show below:
```js
    render() {
        return html`
        <div className="business-component loading_${this.loading > 0}">
            <sling-loader loading="${this.loading > 0}"></sling-loader>
            ... other components
        </div>
        `;
    }
```

The mapStateToProps function must include the LOADING property, which is used to map the state of the component
API requests and responses and trigger the render changes.

```js
export const mapStateToProps = state => ({
  apidata: // ...component data store node
  loading: state.globalReducer.loaders[instanceName],
});
```

## Project Wiki:
https://stonepayments.atlassian.net/wiki/spaces/APICLIENTE