# sling-web-component-menu-item

## Install

```
npm install sling-web-component-menu-item
```

## Tag

```HTML
  <sling-menu-item></sling-menu-item>
```

## Dependencies

* **sling-framework**
* **sling-web-component-icon**

## Attributes and properties

|Name|Type|Default Values|ReflectToAttribute|Required|
|:--|:--|:--|:--|:--:|
|icon|String||:heavy_check_mark:|:x:|
|href|String||:heavy_check_mark:|:heavy_check_mark:|
|active|Boolean||:heavy_check_mark:|:x:|

### Description

|Name|Description|
|:---|:---|
|icon|Sets the icon of the sling-icon component inside of a sling-menu-item|
|href|Has an analogous operation to the href of the tag `<a>`|
|active|Defines whether or not menu item is active.|

## Events

This component does not emit events.

## Examples

All component examples can be emulated using the `npm start sling-web-component-menu` command. A `sling-menu-item` must be a child of `sling-menu` to render.