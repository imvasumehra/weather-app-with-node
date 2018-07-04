const request = require('request');

var geoCodeAddress = (address, callback) => {
  var encodeAddress=encodeURIComponent(address)
  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
    json: true
  }, (error, response, body)=> {
    if(error) {
      callback(undefined, error)
    } else if(body.status === 'ZERO_RESULTS') {
      callback('Unable to find address');
    }else if(body.status === 'OK'){
      callback(undefined, {
        lng: body.results[0].geometry.location.lng,
        lat: body.results[0].geometry.location.lat,
        fa: body.results[0].address_components[1].long_name
      })

    }
    else if(body.status === 'OVER_QUERY_LIMIT') {
      callback('Query Limit Reached! Try Again');
    }


  })
}

module.exports.geoCodeAddress = geoCodeAddress;
