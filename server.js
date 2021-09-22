'use strict';

const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');

const server = express();

const PORT = process.env.PORT;

server.use(cors());

// Routes
server.get('/', homeRouteHandler);
server.get('/weather', getWeatherHandler);


///////////////

// Functions Handler
function homeRouteHandler(req, res) {
    res.send('home route')
}
///////////////

// localhost: http://localhost:3001/weather?city=amman
// key: 3016ca3020534050872dc4030b6fb606 , `http://api.weatherbit.io/v2.0/current?key=`${}`&city=US`

function getWeatherHandler(req, res) {
   
    let searchQuery = req.query.city;
    console.log(req.query.city);

    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`
    console.log(weatherURL);


    // axios always takes .data
    axios.get(weatherURL).then(results =>{
        let newArr = results.data.data.map(element => {
            return new Forecast(element)
        })
        res.send(newArr);
        console.log(newArr)
    })
    .catch(console.error('something went wrong in data'))
}
    class Forecast{
        constructor(element){
            this.date = element.datetime;
            this.description = `low Of ${element.low_temp},high of ${element.high_temp} with` + element.weather.description

        }

    }




///////////////

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

