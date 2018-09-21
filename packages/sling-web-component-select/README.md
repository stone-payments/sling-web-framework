# sling-web-component-select    

## Install      

```
npm instal sling-web-component-select
```
 
 ## Tag
 
```HTML   
  <sling-select></sling-select>
```

 ## Dependencies       
 
* **sling-framework**       
* **sling-helpers** 

 ## Attributes and properties   
        
|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|    
|:--|:--|:--|:--:|:--|:--:|     
|disabled|Boolean|**False**|:heavy_check_mark:|||
|name|String||:heavy_check_mark:|||
|srcoptions|Array|**[ ]**||||
|size|Number||:heavy_check_mark:|||
|value|String||:heavy_check_mark:||||
### Description   
|Name|Description| 
|:---|:---|
|disabled|Disables the Select options, preventing the user from clicking and changing their style to dimmed.|
|name|Names the select tag to control.|
|srcoptions|Array of objects formed by the following properties: `name` that indicates the text that will be shown in the option and `id` that will be the value of the option and will be passed through an event to the form that uses the element. The tag will receive this array to mount the select options.|
|size|If the control is presented as a scroll listbox, this attribute represents the number of rows in the list box that should be visible at a given time. More info in [Select MDN Docs](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/select).|
|value|Value of the selected tag in the current moment.|
## Events  
* **change**

**Description:** The event is triggered when a change of the value of select, taking in the detail of the event the value of the selected option.

## Examples
**srcoptions Array**
```javascript
const srcoptions = 
[
    {
      name: 'Option1',
      id: 1,
    },
    {
      name: 'Option2',
      id: 2,
    },
    {
      name: 'Option3',
      id: 3,
    }
]
```
 
All component examples can be emulated using the `npm start sling-web-component-select` command.   
### Use

```html
<sling-select></sling-select>
```
![image](https://user-images.githubusercontent.com/22959060/41483847-0d8b95b6-70b1-11e8-9f21-091afa028640.png)

```html
<sling-select disabled></sling-select>
```
![image](https://user-images.githubusercontent.com/22959060/41483899-361073a8-70b1-11e8-9cf2-bdfa148b98ef.png)
