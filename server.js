'use strict';

const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const weather = require('./modules/weather')
const movies = require('./modules/movies')
const server = express();
const PORT = process.env.PORT;
server.use(cors());


// Routes

server.get('/weather', weather);
server.get('/movies', movies);


///////////////

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

