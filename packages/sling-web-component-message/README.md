# sling-web-component-message

Sling Message Basic Component.

The message component is a static bar that indicates, through prevailing icons and colors, to the user some state.

## Install

```
npm instal sling-web-component-message
```

## Tag

```HTML
  <sling-message></sling-message>
```

## Dependencies

* **sling-framework**
* **sling-helpers**

## Attributes and properties

|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|
|:--|:--|:--|:--:|:--|:--:|
|srcdata|String||:heavy_check_mark:|
|aim|String||:heavy_check_mark:|

### Description

|Name|Description|
|:---|:---|
|srcdata|This is the message that will be shown in the component|
|aim|Defines the message objective, can be `danger`, `success` or `warning`.|

## Events

This component have no event.

## Examples

All component examples can be emulated using the `npm start sling-web-component-message` command.

### Use

```HTML
<sling-message aim="error"></sling-message>
<sling-message aim="success"></sling-message>
<sling-message aim="alert"></sling-message>
<sling-message aim="standby"></sling-message>
<script>
  srcdata = ['Some message.', 'Some other message.'];
  const components = Array.from(document.querySelectorAll('sling-message'));
  components.map(component => component.srcdata = srcdata);
</script>
```

![image](https://user-images.githubusercontent.com/22959060/45894417-a8dad500-bda4-11e8-83b5-afa3df2e8d00.png)
