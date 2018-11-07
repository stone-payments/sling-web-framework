# sling-web-component-card

## Install

```
npm install sling-web-component-card
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
|backgroundheader|Boolean|**false**|:heavy_check_mark:|
|nopadding|Boolean|**false**|:heavy_check_mark:|
|nopaddingheader|Boolean|**false**|:heavy_check_mark:|
|nopaddingbody|Boolean|**false**|:heavy_check_mark:|
|nopaddingfooter|Boolean|**false**|:heavy_check_mark:|
|nodivisors|Boolean|**false**|:heavy_check_mark:|

### Description

|Name|Description|
|:---|:---|
|backgroundheader|Define the background CSS property of the header.|
|nopadding|Defines whether the card's header, body and footer will have padding.|
|nopaddingheader|Defines whether the card's header will have padding.|
|nopaddingbody|Defines whether the card's body will have padding.|
|nopaddingfooter|Defines whether the card's footer will have padding.|
|nodivisors|Sets whether the card will have lines between header, body and footer.|

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

![image](https://user-images.githubusercontent.com/22959060/45841419-27c20600-bcf0-11e8-80fc-c9d407b640a2.png)
