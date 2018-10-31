# sling-web-component-paginator

## Install

```
npm install sling-web-component-paginator
```

## Tag

```HTML
  <sling-paginator></sling-paginator>
```

## Dependencies

* **sling-framework**
* **sling-helpers**

## Attributes and properties

|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|
|:--|:--|:--|:--:|:--|:--:|
|selected|Number||:heavy_check_mark:|
|total|Number||:heavy_check_mark:|

### Description

|Name|Description|
|:---|:---|
|selected|Representes the currently selected page.|
|total|Representes the total of pages. If set to 0 or undefined, only the left and right arrows will appear (infinite mode); if set to 1, the whole component disappears and if set to 2 or more, the page numbers will appear along with the left and right arrows (default mode).|

## Events

* **paginate**

**Description:** The event is triggered when the arrows are clicked or the current page changes. If the paginator is set to infinite mode, the event detail will be `{ type: 'previous' }`, if the left arrow is clicked; or `{ type: 'next' }` if the right arrow is clicked. If the paginator is set to default mode, the event detail will be `{ type: 'index', index: <Number> }`, where the index will be the current page.

## Examples

All component examples can be emulated using the `npm start sling-web-component-paginator` command.

### Usage

```HTML
<sling-paginator></sling-paginator>
<sling-paginator total="5"></sling-paginator>
<sling-paginator total="5" selected="3"></sling-paginator>
<sling-paginator total="12" selected="3"></sling-paginator>
```

![screen shot 2018-09-20 at 16 33 27](https://user-images.githubusercontent.com/125764/45842396-0282c700-bcf3-11e8-893c-5b04655bc383.png)
