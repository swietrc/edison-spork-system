module.exports = function(sensors) {
  var autorefresh;

  var screenbuffer = [];

  /* stores screen color */
  var screencolor = {
    'red': 50,
    'green': 50,
    'blue': 50
  };

  var notificationled = false;

  var load = function() {
    refresh();
    autorefresh = setInterval(refresh, 10000);
  }

  /**
   * copies and return display parameters (screen color, text, notification led on/off)
   * @returns {object} - display parameters
   */
  var getDisplay = function() {
    return {
      'screencolor': {red: screencolor.red, green: screencolor.green, blue: screencolor.blue },
      'screenbuffer': [screenbuffer[0], screenbuffer[1]],
      'notificationled': notificationled
    }
  }

  var destroy = function() {
    clearInterval(autorefresh);
  };

  var refresh = function() {
    // update stored temp and light values
    var temp = sensors.thermometer.value();
    var light = sensors.lightmeter.value();

    // Update screen buffer
    screenbuffer[0] = 'temp:  ' + temp + 'c';
    screenbuffer[1] = 'light: ' + light+ 'lux';
  }

  return {
    'name': 'Local environment monitor',
    'load': load,
    'getDisplay': getDisplay,
    'destroy': destroy
  }
}
