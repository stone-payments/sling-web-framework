# sling-web-component-input

## Install

```
npm install sling-web-component-input 
```  

## Tag
  
```html        
<sling-input></sling-input>      
```        

## Dependencies              

* **sling-web-framework**             
* **sling-web-helpers**

 ## Attributes and properties
  
 |Name|Type|Default value|ReflectToAttribute|Observer|callSdk  
|:--|:--|:--|:--:|:--|:--:|     
|autocomplete|String|  |:heavy_check_mark:|       
|checked|Boolean |  |:heavy_check_mark:|        
|disabled|Boolean|  |:heavy_check_mark:|                
|label|String|  |:heavy_check_mark:|           
|type|String| **text** |:heavy_check_mark:|formatType |          
|max|Number|  |:heavy_check_mark:|      
|maxlength|Number|  |:heavy_check_mark:|          
|min|Number|  |:heavy_check_mark:|          
|minlength|Number|  |:heavy_check_mark:|          
|name|String|  |:heavy_check_mark:|          
|pattern|String|  |:heavy_check_mark:|          
|placeholder|String|  |:heavy_check_mark:|          
|readonly|Boolean |  |:heavy_check_mark:|  
|required|Boolean |  |:heavy_check_mark:|         
|size|Number|  |:heavy_check_mark:|          
|src|String|  |:heavy_check_mark:|        
|state|String|  |:heavy_check_mark:|         
|step|Number|  |:heavy_check_mark:|         
|validationmessage|Object|  |:heavy_check_mark:|         
|value|String|  |:heavy_check_mark:| formatValue |         
    
### Description   
| Name | Description | 
|:---|:---|        
| autocomplete|Indicates whether the control value can be automatically completed by the browser, is ignored if value of type attribute is `hidden`, `password`, `checkbox`, `radio`, `file` or `button` type (`button`, `submit`, `reset`, `image`). More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).            
| checked| When the value of the type attribute is radio or checkbox, the presence of this Boolean attribute indicates that the control is selected by default; otherwise, this attribute is ignored. More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
| disabled|Indicates that form control is not available for interaction.  More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
| label|Receives the **text** that will be used as input label.  
| type|  The type of control to be displayed. The property receives all the options of a [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
| max |The maximum value (numeric or date) for this item, which should not be less than its minimum value (min attribute).More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
| maxlength|If the value of the ** type ** attribute is `text`,` email`, `search`,` password`, `tel` or` url`, this attribute specifies the maximum number of characters (in Unicode code points) that the user can insert. More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
| min|The minimum value (number or date) for this item, which should not be greater than its maximum (max attribute). More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
| minlength|If the value of the ** type ** attribute is `text`,` email`, `search`,` password`, `tel` or` url`, this attribute specifies the minimum number of characters (in Unicode code points) that the user can enter. More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
| name|The name of the control, which is sent along with the form data.  
| oninput|A function that is called when populated the field, it triggers an `input` event that loads an object with field information.  
| pattern|A regular expression used to validate the value of the control. More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
| placeholder|A hint to the user of what he can enter in the control. More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
| readonly|This Boolean attribute indicates that the user can not modify the value of the control. More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
|required|This attribute specifies that the user must fill in the field with a value before submitting the form. More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
| size|The initial size of the control. More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
| src|If the value of the type attribute is image, this attribute specifies a URI for the location of an image to be displayed on the graphic button. More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
| state|Controls the state of `input` field, its values ​​may vary in` success` `warning` and ` error`  
| step|Works together with `min` and `max` attributes to limit increments in which numeric values ​​or dates can be changed. More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
| validationmessage|Receives an object with the validation message from the parent.  
| value|The initial value of control. This attribute is optional except when the value of the type attribute is radio or checkbox. More information on [input HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input).  
  
## Events  
* **input**

**Description:** Event triggered when field is populated, has the values and field type as properties.     

**Details:**

|Name|Description|
|:--|:--|
|value|Value of input field that will be passed to the parent.|
|type|Type of input field that will be passed to the parent.|
  
 ## Examples            
 All component examples can be emulated using the `npm start sling-web-component-input` command.         
### Use      
      
 ```HTML      
<sling-input label="Label" placeholder="Placeholder..."></sling-input>      
```      
      
![image](https://user-images.githubusercontent.com/22959060/40748998-e25d4580-6438-11e8-9926-95eaa9840d72.png)      
  ```HTML      
<sling-input label="Disabled" placeholder="Placeholder..." disabled></sling-input>      
```      
      
![image](https://user-images.githubusercontent.com/22959060/40749159-77aced3e-6439-11e8-89ad-76e53e5fb0aa.png)      
  ```HTML      
<sling-input label="Success" placeholder="Placeholder..." state="success"></sling-input>      
 ```        
![image](https://user-images.githubusercontent.com/22959060/40749201-93b49d88-6439-11e8-877b-d64f4b1ca541.png)
