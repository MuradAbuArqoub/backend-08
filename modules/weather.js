'use strict';
const axios = require('axios');
let cacheMemory = {};

function getWeatherHandler(req, res) {
   
    let searchQuery = req.query.city;

    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`
    if (cacheMemory[searchQuery] !== undefined) {
        console.log('the cache contain data ')
        console.log(cacheMemory);
        res.send(cacheMemory[searchQuery]);
    } else {
        console.log('cache memory is empty hit the api')
    }
    axios.get(weatherURL).then(results =>{

        let newArr = results.data.data.map(element => {
            return new Forecast(element)
        })
        cacheMemory[searchQuery] = newArr;

        res.send(newArr);

    })
    .catch(console.error('something went wrong in data weather'))
}

    class Forecast{
        constructor(element){
            this.date = element.datetime;
            this.description = `low Of ${element.low_temp},high of ${element.high_temp} with` + element.weather.description

        }

    }

    module.exports = getWeatherHandler;