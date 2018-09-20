# sling-web-component-loader

The loader Component. It´s aimed to be used in pair with business components that demands requests and component renders with processess delays.
The component must show the loader element while loading the data source required to populate and render his view.

## Install

```
npm instal sling-web-component-loader
```

## Tag

```HTML
  <sling-loader></sling-loader>
```

## Dependencies

* **sling-framework**
* **sling-helpers**

## Attributes and properties

|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|
|:--|:--|:--|:--:|:--|:--:|
|loading|Boolean||:heavy_check_mark:|

### Description

|Name|Description|
|:---|:---|
|loading |Boolean that defines if the loader will be displayed.|

## Events

This component have no event.

## Examples

All component examples can be emulated using the `npm start sling-web-component-loader` command.

### Use

```HTML
 <sling-loader loading></sling-loader>
```
