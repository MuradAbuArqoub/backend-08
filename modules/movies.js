'use strict';
const axios = require('axios');
let cacheMemory = {};
function getMoviesHandler(req, res) {

    let searchQuery = req.query.city;

    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${searchQuery}`
    if (cacheMemory[searchQuery] !== undefined) {
        console.log('the cache contain data ')
        console.log(cacheMemory);
        res.send(cacheMemory[searchQuery]);
    } else {
        console.log('cache memory is empty hit the api')
    }
    axios.get(movieURL).then(results => {

        let newArr = results.data.results.map(element => {
            return new Movies(element)
        })
        cacheMemory[searchQuery] = newArr;
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