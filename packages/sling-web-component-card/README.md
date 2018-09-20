# sling-web-component-card

Sling Card Basic Component.

## Install

```
npm instal sling-web-component-card
```

## Tag

```HTML
  <sling-card></sling-card>
```

## Dependencies

* **sling-framework**
* **sling-helpers**

## Attributes and properties

|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|
|:--|:--|:--|:--:|:--|:--:|
|nopadding|Boolean|**false**|:heavy_check_mark:|
|nopaddingheader|Boolean|**false**|:heavy_check_mark:|
|nopaddingbody|Boolean|**false**|:heavy_check_mark:|
|nopaddingfooter|Boolean|**false**|:heavy_check_mark:|

### Description

|Name|Description|
|:---|:---|
|nopadding |Defines whether the entire card will have padding.|
|nopaddingheader|Set the card's header will have padding.|
|nopaddingbody|Defines whether the body of the card will have padding.|
|nopaddingfooter|Sets whether the card's footer will have padding.|

## Events

This component have no events.

### Usage

All content that is used inside the tag automatically goes to the body of the card in case you need to use header or footer.
use the `slot` tag to direct the content.

```HTML
<sling-card>
  <span slot="header">Header</span>
  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua.
  </div>
  <span slot="footer">Footer</span>
</sling-card>
```

![image](https://user-images.githubusercontent.com/22959060/45841305-c00bbb00-bcef-11e8-8f19-918a7690cb21.png)