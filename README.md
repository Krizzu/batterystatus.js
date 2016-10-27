# batterystatus.js

Simple Web API use for display status of Your battery.  
More here:  
[https://developer.mozilla.org/en/docs/Web/API/Battery_Status_API](More info here)

___

### Including `batterystatus.js` in a project

Simply add this line between Your `Head` tags in html file:

```html
<script src='batterystatus.js'></script>
```
---

### Current Features

1. Nice guy showing battery, charging level and charging status(if currently charging or not)
2. Whenever below 30%, battery color is changing to indicating low level  
   Every 5%, battery will show up again, to remind you about low level of charge :)
3. Options that allows to customize battery (including key combination to show/hide, touch battery to show/hide etc.)

---

### Planned future

1. To add notifications (customizable)
2. Add sound (still not quite sure about it)
3. Add options to change size/placement of the battery
4. Add function that checks if BatteryManager API is able to run
5. Add function that will run custom settings, according to what device is running

---

### API

To start, initialize BatteryStatus:

```javascript
BatteryStatus.init([options])
```

##### options
```javascript
{
  enableTouch: true/false, //If enabled, allows to touch battery to hide/show (default true)
  enableKey: true/false, //If enabled, allows to use key combinations to show/hide battery (default: false)
}
```  

To toggle visibility of the Battery (only after `init()` has been run):
```javascript
BatteryStatus.toggle([option]);
```
##### options
```javascript
true; //anything that give true will always show up the battery
```

---

## License

This project is licensed under the MIT License
