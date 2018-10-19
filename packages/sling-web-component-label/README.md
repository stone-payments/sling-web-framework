# sling-web-component-label

## Install

```
npm instal sling-web-component-label
```

## Tag

```HTML
  <sling-label></sling-label>
```

## Dependencies

* **sling-framework**
* **sling-helpers**

## Attributes and properties

|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|
|:--|:--|:--|:--:|:--|:--:|
|type|String|**fill**|:heavy_check_mark:|
|color|String|**green**|:heavy_check_mark:|
|size|String|**small**|:heavy_check_mark:|
|imageName|String| |:heavy_check_mark:|
|showBullet|Boolean|**false**|:heavy_check_mark:|

### Description

|Name|Description|
|:---|:---|
|type|Sets the layout type of label, can be fill, outline and text.|
|color|Sets the color's label, can be red, yellow, gray, green and purple.|
|size|Sets the the size's label, can be small, medium and big.|
|imageName|Sets an image left of the text, can be any `sling-web-component-icon` name.|
|showBullet|Sets a bullet before of the text, setted false by default.|

## Events

This component have no events.

### Usage

All content that is used inside the tag automatically goes to the body of the label.

```HTML
<sling-label size="small" color="red" type="text" imageName="success">LABEL</sling-label>
```
