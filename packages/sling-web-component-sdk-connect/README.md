# sling-web-component-sdk-connect    

## Install      

```
npm instal sling-web-component-sdk-connect
```
 
 ## Tag
 
```HTML   
  <sling-sdk-connect></sling-sdk-connect>
```

 ## Dependencies       
 
* **sling-web-framework**       
* **sling-web-helpers** 

 ## Attributes and properties   
        
|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|    
|:--|:--|:--|:--:|:--|:--:|     
|block|Boolean|**false**|:heavy_check_mark:|     
|color|String|**normal**|:heavy_check_mark:|        
|disabled|Boolean|**false**|:heavy_check_mark:|        
|size|String|**normal**|:heavy_check_mark:|        
|Type|String|**normal**|:heavy_check_mark:|    

### Description   
|Name|Description| 
|:---|:---|
|block |A boolean value that assigns the `width: 100%` CSS property to button.|
|color|A pre-configured value for styling of button, can be `normal`, `primary`,` secondary`, `success`,` danger`, `warning`,` info`, `clear`.|
|disabled|Disables the button, preventing the user from clicking and changing their style to dimmed|
|size|A pre-configured value for size of button, can be `normal`, `small` or ` big`.|
|type|A pre-configured value for size of button, can be `normal`, `outline` or `text`.|

## Events  
* **click**

**Description:** The event is triggered when the button is clicked and passes this information to the parents.     

## Examples      
 
All component examples can be emulated using the `npm start sling-web-component-button` command.   
### Use


```HTML
<sling-button color="primary">Text</sling-button>
```

![image](https://user-images.githubusercontent.com/22959060/40404435-3c2eeb9c-5e2e-11e8-8729-2e2a9ef2abd5.png)      
      
  
```HTML
<sling-button block size="big" color="warning">Text</sling-button>
```
  
![image](https://user-images.githubusercontent.com/22959060/40404419-2056f932-5e2e-11e8-83fe-d7b754ccdef1.png)      
      
  
```HTML
<sling-button color="danger">Text</sling-button>
 ```  
  ![captura de tela de 2018-05-23 01-48-41](https://user-images.githubusercontent.com/22959060/40404049-1dd883f8-5e2c-11e8-895a-fedd11f0b19a.png)
