'use strict';

const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');

const server = express();

const PORT = process.env.PORT;

server.use(cors());

// Routes
server.get('/movies', getMoviesHandler);

///////////////

// localhost: https://api.themoviedb.org
// key: 577af136c8854c63bc87a7fdce572e23 , `https://api.themoviedb.org/3/movie/550?api_key=577af136c8854c63bc87a7fdce572e23`

function getMoviesHandler(req, res) {
   
    let searchQuery = req.query.movie;
    console.log(req.query.movie);

    let moviesURL = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIES_API_KEY}`
    console.log(moviesURL);


    // axios always takes .data
    axios.get(moviesURL).then(results =>{
        let newArr = results.data.data.map(element => {
            return new Movies(element)
        })
        res.send(newArr);
        console.log(newArr)
    })
    .catch(console.error('something went wrong in data'))
}
    class Movies{
        constructor(element){
            this.date = element.datetime;
            this.description = element.weather.description

        }

    }




///////////////

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

