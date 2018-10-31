# sling-web-component-sdk-connect    

## Install      

```
npm install sling-web-component-sdk-connect
```
 
 ## Tag
 
```HTML   
  <sling-sdk-connect></sling-sdk-connect>
```

 ## Attributes and properties   
        
|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|    
|:--|:--|:--|:--:|:--|:--:|     
|store|Function|||     
|state|Object|||        
|dispatch|Function|||        
|subscribe|Function|||

### Description   
|Name|Description| 
|:---|:---|
|store|Receives a [Redux Store](https://redux.js.org/api/store).|
|state|The current Store state. The same as calling `getState()` on Redux.|
|dispatch|Disables the button, preventing the user from clicking and changing their style to dimmed|
|subscribe|A pre-configured value for size of button, can be `normal`, `small` or ` big`.|

## Events

This component does not emit events.

## Examples

```html
<sling-sdk-connect></sling-sdk-connect>
```

```javascript
import { MyReduxStore } from './my-redux-store.js';
const sdkStore = document.querySelector('sling-sdk-connect');
sdkStore.store = MyReduxStore;
console.log(sdkStore.state);
```
