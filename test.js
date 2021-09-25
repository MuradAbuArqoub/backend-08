'use strict';

const cors = require('cors');
const express = require('express');
require('dotenv').config();

const server = express();

const PORT = process.env.PORT;

server.use(cors());



// Routes
server.get('/', homeRouteHandler);
server.get('*', notFoundHandler);

///////////////

// Functions Handler
function homeRouteHandler (req, res){
    res.send('home route')
}
function notFoundHandler (req, res){
    res.status(404).send('not found 404')
}

///////////////



server.listen(PORT, () =>{
    console.log(`Listening on PORT ${PORT}`)
})