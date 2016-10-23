/*
      Web api:
      https://goo.gl/8I9PRJ

      Battery Status v1.0.0
*/
var BatteryStatusInit = function () {

  var bstatus = document.createElement("div");

  bstatus.setAttribute('id', 'batteryStatusMain')
  //main part of the battery
  bstatus.style['font-size'] = '16px';
  bstatus.style['font-weight'] = '900';
  bstatus.style.color = 'white';
  bstatus.style.width = '100px';
  bstatus.style.height = '180px';
  bstatus.style.background = '#7ede6e';
  bstatus.style.border = "2px solid #394488";
  bstatus.style['border-radius'] = '6px';
  bstatus.style.position =  'fixed';
  bstatus.style.right = "120px";
  bstatus.style.top = "50px";
  bstatus.style['box-shadow'] = "0px 0px 2px 1px #333";

  //animation stuff
  bstatus.style.WebkitTransition= "top 0.5s";
  bstatus.style.MozTransition= "top 0.5s";

  //top part of battery
  var bModelTop = document.createElement('span');
  bModelTop.style.width = '40px';
  bModelTop.style.height = '20px';
  bModelTop.style.background = '#3c3c71';
  bModelTop.style.position = 'absolute';
  bModelTop.style.left = '30px';
  bModelTop.style.top = '-20px';


  //battery status (level) indicator (that div with green background :> )
  var bLevelStatus = document.createElement('span');
  bLevelStatus.setAttribute('id', 'chargingLevelHeight');
  bLevelStatus.style.width = '100px';
  bLevelStatus.style['max-height'] = '180px';
  bLevelStatus.style.position =  'absolute';
  bLevelStatus.style.background = 'white';

  //battery handler (the one you click when battery is hidden and enableActivationOnTouch is true)
  var bHandler = document.createElement('span');
  bHandler.setAttribute('id', 'bStatusHandler');
  bHandler.style.width = '30px';
  bHandler.style.display= 'none';
  bHandler.style.height = '20px';
  bHandler.style.border = '1px solid #333';
  bHandler.style['border-radius'] = '5px';
  bHandler.style['background-color'] = '#333';
  bHandler.style.position = 'absolute';
  bHandler.style.top = '200px';
  bHandler.style.left = '35px';
  bHandler.innerHTML='<span style="padding-left: 5px">+   -</span><span style="color: white;position: relative;display: inline-block;left: 5px;width: 3px; height: 5px; background-color: black; border: 1px solid black; border-radius: 15px;"></span>';

  //Charging indicator
  //As I wanted to keep this one file specify, I had to draw svg myself.
  //With little help of http://www.janvas.com/ :)
  var chargingSing = document.createElement('span');
  chargingSing.className = "chargingState";
  chargingSing.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="" pageAlignment="none" x="0px" y="0px" width="100px" height="180px" viewBox="0 0 100 180" enable-background="new 0 0 100 180" xml:space="preserve"><defs/><g type="LAYER" locked="true"/><g type="LAYER"><path transform="matrix(1 0 0 1 12.220795892169605 9.242618741976997)" width="53.60718870346601" height="72.55455712451862" stroke-miterlimit="3" fill="#444444" opacity="0.35" d="M30.880756625320373,30.880756625320366 L53.60718870346601,0.23106546854942067 L35.77767645548187,72.78562259306804 L0,72.78562259306804 L30.880756625320373,30.880756625320366 Z "/><path transform="matrix(-1 0 0 -1 87.89473684210661 137.25288831835712)" width="53.60718870346601" height="72.55455712451862" stroke-miterlimit="3" fill="#444444" opacity="0.35" d="M30.880756625320373,30.880756625320366 L53.60718870346601,0.23106546854942067 L35.77767645548187,72.78562259306804 L0,72.78562259306804 L30.880756625320373,30.880756625320366 Z "/></g></svg>`;


  //adding battery elements to to main component
  bstatus.appendChild(bModelTop);
  bstatus.appendChild(bLevelStatus);
  bstatus.appendChild(bHandler);

  var BatteryStatus;

  return BatteryStatus = {
    isInitiated: false,

    updateBatteryLevel: function(battery) {
      if(!this.isInitiated) return `Please run 'init' first.`;
      if(!battery || !(battery instanceof BatteryManager)) return 'Invalid argument';

      let levelP = document.getElementById('chargingLevelPercentage');
      let levelH = document.getElementById('chargingLevelHeight'); //height of green indicator
      levelP.innerHTML = Number(battery.level * 100).toFixed(0) +'%'
      levelH.style.height = 100 - battery.level * 100+"%";
    },

    displayChargingIndicators: function displayChargingIndicators(battery) {
      if(!this.isInitiated) return `Please run 'init' first.`;
      if(!battery || !(battery instanceof BatteryManager)) return 'Invalid argument';

      let eleArray = document.getElementsByClassName('chargingState');
      for(let ele of eleArray) {
        if(battery.charging) ele.style.display = 'block';
        else ele.style.display = 'none';
      }
    },

    init: function(options={}){
      if(this.isInitiated) return `Already initiated.`;
      navigator.getBattery()
      .then( battery => {

        //enableActivationByKey: if true, it will set the key ( alt+q ) that shows/hides battery
        //enableActivationOnTouch: if true, touching battery will make it hide
        let batteryInfo = "";
        let enableActivationByKey, enableActivationOnTouch;

        //Check arguments passed to init function. Apply options to function
        if(options) {
          enableActivationByKey = options.enableKey;
          enableActivationOnTouch = options.enableTouch;
        }
        else {
          enableActivationByKey = false;
          enableActivationOnTouch = true;
        }

        //Battery info: level and show proper text/image if charging
        batteryInfo += '<h3 class="chargingState" style="position: absolute;top:120px;left:10px">Charging</h3>';
        batteryInfo += '<h3 id="chargingLevelPercentage" style="position: absolute;top:140px;left:30px">'+Number(battery.level * 100).toFixed(0) +'%'+'</h3>';

        //Attach everything to DOM, mark it as already initiated.
        bstatus.appendChild(chargingSing);
        bstatus.innerHTML+=batteryInfo;
        document.getElementsByTagName('body')[0].appendChild(bstatus);
        this.isInitiated = true;

        //updating battery status on first init.
        this.updateBatteryLevel(battery);
        this.displayChargingIndicators(battery);
        //events here:

        //on charger plug/unplug event change
        battery.onchargingchange = this.displayChargingIndicators.bind(this, battery);
        //on level change
        battery.onlevelchange = this.updateBatteryLevel.bind(this, battery)

        //When key pressed, show/hide battery
        if(enableActivationByKey){
          document.addEventListener('keydown', function(event) {
            if(event.altKey && event.code == 'KeyQ'){
              let mainEle = document.getElementById('batteryStatusMain');
              let handler = document.getElementById('bStatusHandler');
              let top = Number(mainEle.style.top.replace("px", ""));
              if(top == '-200') {
                top = '50';
                if(enableActivationOnTouch) handler.style.display = 'none';
              }
              else {
                top = '-200';
                if(enableActivationOnTouch) handler.style.display = 'block';
              }
              mainEle.style.top = top + 'px';
            }
          })
        }

        //when battery is pressed, show/hide
        if(enableActivationOnTouch) {
          let handler = document.getElementById('bStatusHandler');
          let battery = document.getElementById('batteryStatusMain');
          battery.addEventListener('click', function () {
            let top = Number(battery.style.top.replace("px", ""));
            if(top == '-200') {
              top = '50';
              handler.style.display = 'none';
            }
            else {
              top = '-200';
              handler.style.display = 'block';
            }
            battery.style.top = top + 'px';
          })
        }
      })
    }
  }
}
window.BatteryStatus = BatteryStatusInit()
