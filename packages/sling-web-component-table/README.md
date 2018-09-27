# sling-web-component-table

## Install

```
npm instal sling-web-component-table
```

 ## Tag

```HTML
  <sling-table></sling-table>
```

 ## Dependencies

* **sling-framework**
* **sling-helpers**
* **sling-web-component-brand-icon**

 ## Attributes and properties

|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|
|:--|:--|:--|:--:|:--|:--:|
|srccolumns|Array|**[ ]**| |
|srcdata|Array|**[ ]**| |
|noheader|Boolean|**false**|:heavy_check_mark:|
|clickablerows|Boolean|**false**|:heavy_check_mark:|

### Description

|Name|Description|
|:---|:---|
|srccolumns |Array with the specification of the table columns. Each element of array is an object representing a column in the format `{ title: 'Column Label', field: 'columndatakey' }`. |
|srcdata|Array containing data to be shown. Each element of array is an object with field names informed in `srccolumns`.|
|noheader|Hides table header.|
|clickablerows|Enables click event for table rows.|

## Events

* **rowclicked**

**Description:** The event is triggered when a row is clicked and passes this information to the parents.

## Examples

All component examples can be emulated using the `npm start sling-web-component-table` command.

### Usage

```HTML
<sling-table></sling-table>
```

```HTML
<sling-table noheader></sling-table>
```

![image](https://user-images.githubusercontent.com/22959060/45834251-0efc2500-bcdd-11e8-8eb4-808a9e62c014.png)

```HTML
<sling-table clickablerows></sling-table>
 ```

![image](https://user-images.githubusercontent.com/22959060/45834251-0efc2500-bcdd-11e8-8eb4-808a9e62c014.png)

```HTML
<sling-table noheader clickablerows></sling-table>
 ```

 ![image](https://user-images.githubusercontent.com/22959060/45834251-0efc2500-bcdd-11e8-8eb4-808a9e62c014.png)
