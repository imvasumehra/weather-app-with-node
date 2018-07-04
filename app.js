var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}));
//const request = require('request');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//const geocode= require('./geocode/geocode')
//const weather = require('./weather/weather')

app.get('/', (req, res) => {
  res.render('home')
});

app.post('/address', (req, res) =>{
  var newAddress = req.body.address;
  geocode.geoCodeAddress(newAddress, (err, results) => {
    if(err) {
      if(err === 'Query Limit Reached! Try Again'){
        res.render('home2');
      } else {
        res.render('error',{err:err})
      }

    } else {
      //console.log(`-------FOR ${results.lat} and ${results.lng}-------`);
      weather.getWeather(results.lat, results.lng, (err, result) => {
        if(err) {
          res.render('error',{err:err});
        } else {
          var fa = results.fa;
          var tmp = Math.round((result.tmp-32)*5/9);
          var atmp = Math.round((result.atmp-32)*5/9);
          var precI = result.precI
          var precP = result.precP
          var hm = result.hm
          var hs = result.hs
          var ds = result.ds
          //console.log(`${result.tmp}, ${result.atmp}`)
          res.render('result',{fa: fa,
                               tmp: tmp,
                               atmp: atmp,
                               precI: precI,
                               precP: precP,
                               hm: hm,
                               hs: hs,
                               ds: ds
                             });
        }
      });
    }
  })
});

app.listen(port, () =>{
  //console.log('Server rolling');
})
