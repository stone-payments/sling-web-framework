# sling-web-component-snackbar

## Install

```
npm instal sling-web-component-snackbar
```

## Tag

```HTML
  <sling-snackbar></sling-snackbar>
```

## Dependencies

* **sling-framework**
* **sling-helpers**

## Attributes and properties

|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|
|:--|:--|:--|:--:|:--|:--:|
|layout|String||:heavy_check_mark:|
|aim|String||:heavy_check_mark:|
|size|String||:heavy_check_mark:|
|closeable|Boolean||:heavy_check_mark:|

### Description

|Name|Description|
|:---|:---|
|layout |Sets the layout type of snackbar, currently only `outline`..|
|aim|Defines the snackbar objective, can be danger, success or warning.|
|size|Value that defines the size.|
|closeable|Defines whether or not snackbar has the close icon.|

## Events

This component does not emit events.

## Examples

All component examples can be emulated using the `npm start sling-web-component-snackbar` command.

### Usage

```HTML
<sling-snackbar closeable size="small">
  Here is a message for you.
  <sling-button slim color="light" layout="outline" size="small">Action</sling-button>
</sling-snackbar>
```

![image](https://user-images.githubusercontent.com/22959060/45716170-7c3c7880-bb6c-11e8-9f7c-72f3e0ef0d9c.png)

```HTML
<sling-snackbar closeable size="small" aim="danger">
  Here is a message for you.
  <sling-button slim color="light" layout="outline" size="small">Action</sling-button>
</sling-snackbar>
```

![image](https://user-images.githubusercontent.com/22959060/45716248-bdcd2380-bb6c-11e8-9b38-30df01414b8e.png)
