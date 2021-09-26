'use strict';
const axios = require('axios');

function getMoviesHandler(req, res) {

    let searchQuery = req.query.city;

    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${searchQuery}`

    axios.get(movieURL).then(results => {

        let newArr = results.data.results.map(element => {
            return new Movies(element)
        })
        res.send(newArr);

    })
        .catch(console.error('something went wrong in data results'))
}

class Movies{
    constructor(element){
        this.title = element.title;
        this.overview = element.overview;
        this.vote_average = element.vote_average;
        this.vote_count = element.vote_count;
        this.poster_path = element.poster_path;
        this.popularity = element.popularity;
        this.date = element.release_date;
    }

}

module.exports = getMoviesHandler;