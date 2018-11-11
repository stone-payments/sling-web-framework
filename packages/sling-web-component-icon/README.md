# sling-web-component-icon

## Install

```
npm install sling-web-component-icon
```

## Tag

```HTML
  <sling-icon></sling-icon>
```

## Dependencies

* **sling-assets**
* **sling-framework**
* **sling-helpers**

## Attributes and properties

|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|
|:--|:--|:--|:--:|:--|:--:|
|icon|String||:heavy_check_mark:|

### Description

|Name|Description|
|:---|:---|
|icon |Defines the icon that will be used, currently can be `success`, `danger`, `close`, `warning`, `info`|

## Events

This component does not emit events.

## Examples

All component examples can be emulated using the `npm start sling-web-component-icon` command.

### Usage

```HTML
<sling-icon icon="success"></sling-icon>
```

![image](https://user-images.githubusercontent.com/22959060/45774538-9c7b3e80-bc23-11e8-902a-2de508f3510d.png)

```HTML
 <sling-icon icon="danger"></sling-icon>
```

![image](https://user-images.githubusercontent.com/22959060/45774572-b0bf3b80-bc23-11e8-877e-d602fb994def.png)
