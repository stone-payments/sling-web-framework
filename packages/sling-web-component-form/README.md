# sling-web-component-form

## Install

```
npm install sling-web-component-form
```

## Tag

```HTML
  <sling-form></sling-form>
```

## Dependencies

### Required

* **sling-framework**
* **sling-helpers**

### Recommended

* **sling-web-component-button**
* **sling-web-component-input**

## Attributes and properties

|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|
|:--|:--|:--|:--:|:--|:--:|
|formdata|Object|**false**|:x:|:heavy_check_mark:|
|validation|Array|**[]**|:x:|:x:|

### Description

|Name|Description|
|:---|:---|
|formdata|Object that contains the data from the form|
|validation|A list of `sling-helper` methods for validations|

## Events  
* **formsubmit**
**Description:** Event triggered every time that the form is submitted.     

* **formupdate**
**Description:** Event triggered when any value of the form is changed.     

### Use

Use it like you are using a `<form>` tag. You can put anything form-related inside of it.
      
 ```HTML      
<sling-form>
  <sling-input name="name" type="text" label="Name"></sling-input>
  <!-- ... -->
</sling-form>      
```      

## Examples            
All component examples can be emulated using the `npm start sling-web-component-form` command.
      