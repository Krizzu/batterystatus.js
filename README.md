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
---

## License

This project is licensed under the MIT License
