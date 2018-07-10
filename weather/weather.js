const request = require('request');

var getWeather = (lat, lng, callback) => {

  request({
    url: `https://api.darksky.net/forecast/375688b2c0ec106fa7ee1f38acdf8635/${lat},${lng}`,
    json: true
  }, (error, response, body)=> {
    if(error) {
      callback("unable to connect currently");
    //} else if(body.status === 'ZERO_RESULTS') {
      //callback('Unable to find address');
    }else //if(body.status === 'OK'){
      {
        //console.log(body.currently);
        callback(undefined, {
          tmp: body.currently.temperature,
          atmp: body.currently.apparentTemperature,
          precP: body.currently.precipProbability,
          precI: body.currently.precipIntensity,
          hm: body.currently.humidity,
          hs: body.hourly.summary,
          ds: body.daily.summary
        })
      }
    })};

module.exports.getWeather = getWeather;
