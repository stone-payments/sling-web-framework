# sling-web-component-tooltip

The tooltip component is a simple and customizable tooltip that receives an text and a position.

 
## Install      
```
npm install sling-web-component-tooltip
```
  
## Tag

```HTML
<sling-tooltip></sling-tooltip>
```    

## Dependencies        
    
  sling-web-framework     
    
## Attributes and properties

|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|
|:--|:--|:--|:--:|:--|:--:|
|position|String|**right**|:heavy_check_mark:|
|tooltiptext|String|**undefined**|:heavy_check_mark:|

### Description

|Name|Description|
|:---|:---|
|position |Defines where the tooltip should show.|
|tooltiptext|Set the tooltip text.|

## Events

This component have no events.

### Usage

The tooltip will hover the content inside the tag

```HTML
<sling-tooltip position="right" tooltiptext="Tooltip">Hover me</sling-tooltip>
```
