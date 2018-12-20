# sling-web-component-menu

## Install

```
npm install sling-web-component-menu
```

## Tag

```HTML
  <sling-menu></sling-menu>
```

## Dependencies

* **sling-framework**
* **sling-web-component-menu-item**

## Attributes and properties

|Name|Type|Default Values|ReflectToAttribute|Required|
|:--|:--|:--|:--|:--:|
|layout|String||:heavy_check_mark:|:heavy_check_mark:|
|size|String||:heavy_check_mark:|:heavy_check_mark:|
|icononly|Boolean||:heavy_check_mark:|:x:|

### Description

|Name|Description|
|:---|:---|
|layout|Sets the layout type of menu, vertical or horizontal|
|size|Value that defines the size of the menu: small, medium or large.|
|icononly|Defines whether or not menu displays only icons.|

## Events

This component does not emit events.

## Examples

All component examples can be emulated using the `npm start sling-web-component-menu` command.

### Usage

```HTML
<sling-menu layout=" size="small">
  <sling-menu-item [...]>...</sling-menu-item>
</sling-snackbar>
```