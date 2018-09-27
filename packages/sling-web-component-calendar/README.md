# sling-web-component-calendar

The calendar component is a simple and customizable calendar that receives an array with data to be shown according to the configuration passed.

 
## Install      
```
npm instal sling-web-component-calendar
```
  
## Tag

```HTML
<sling-calendar></sling-calendar>
```    

## dependencies        
    
  sling-web-framework       
  sling-web-helpers        
    
## Attributes and properties
  
|Name|Type|Values|ReflectToAttribute|Observer|callSdk|    
|:--:|:--:|:--:|:--:|:--:|:--:|     
|calendarinstance|Object| (Value 1) |   |     
|configuration|Object|  (Value 2)  |  |        
|selecteddate|String| Date Ex: 2018-05-01 |:heavy_check_mark:|        
|srcdata|Array|  (Value 3) |  |

**Value 1**
```javascript
calendarinstance = {
  weeks: [[{
    class: 'calendar__day_selected',
  }]],
}
```

**Value 2**
```javascript
configuration = {
  onDaySelection: (day) => {
    this.selecteddate = day;
  },
  onMonthChange: (viewPeriod) => {
    this.startdate = viewPeriod.start;
    this.finaldate = viewPeriod.end;
  },
  field: field => html`
    ${field.map(item => html`
      <p
        className="calendar__info calendar__status
        calendar__status_${item.settlement_status_id}"
        title="${item.status}">
        <span style="white-space: nowrap">
          ${globalFormatters.formatCurrency(item.amount)}
        </span>
      </p>`)}`,
}
```
**Value 3**
```javascript
srcdata = [{
  name: 'Crédito',
  amount: 38344.59,
  brandId: 1,
  wallet_type_id: 3
}]
```

## Events       

This component does not emit events.
      
## Examples

The component example can be emulated using the `npm start sling-web-component-calendar` command.

### Use

```HTML 
<sling-calendar></sling-calendar>
```

![image](https://user-images.githubusercontent.com/22959060/40464824-e32f6dfc-5ef3-11e8-949e-636fa9862555.png)

