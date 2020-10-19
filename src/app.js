const path = require('path')
const express = require('express')
const hbs = require('hbs')
const https=require('https');
var weather = require('weather-js');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const ejs=require('ejs')
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000
const app = express()
app.use(bodyParser.urlencoded({extended: true}));
const public = path.join(__dirname, '../public')
const partials = path.join(__dirname, '../partials')

// setup static directory  to serve
app.use(express.static(public)) // express.static() middleware function to serve static files from a directory

// set up handlebars engine
app.set('view engine', 'hbs')
hbs.registerPartials(partials)

app.get('/', function (req, res){
    // res.render('index', {
    //     title: 'Weather Channel',
    //     name: 'Jaishna Singh Bhogal'
    // })
    res.render("trial3");
  })

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jaishna Singh Bhogal'
    })
})

app.post("/", function(req, res){
  const city=(req.body.city);
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=06a5b16df8dc77f5bb49709bbb082159";

  https.get(url, function(response)
{
  response.on("data", function(data){
    const weatherData=JSON.parse(data);
   const w=Math.round((weatherData.main.temp)-273)+" deg C";
   const hum=(weatherData.main.humidity);
   const des=(weatherData.weather[0].description);
   const name=weatherData.name;
   const pr=weatherData.main.pressure;
     res.render("info", {temp:w, name:name, hum:hum, des:des, pr:pr});
  })
})

})
//
// https.get(url, function(response){
// const w;
// response.on("data", function(data)
// {
//  const weatherData=JSON.parse(data);
//  w=(weatherData.main.temp);
// const hum=(weatherData.main.humidity);
// const des=(weatherData.weather[0].description);
// console.log(des);
// })
// })
// app.get("/", function(req,res)
// {
//   res.render("info",{temp:w})
// })



app.get('/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Jaishna Singh Bhogal'
    })
})

app.listen(port, () => {
    console.log('Server runnning...')
})
