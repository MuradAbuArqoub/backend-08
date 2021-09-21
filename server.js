'use strict';

const cors = require('cors');
const express = require('express');
require('dotenv').config();

const server = express();

const PORT = process.env.PORT;

server.use(cors());

server.get('/', (req, res) =>{
    res.send('home route')
})

server.listen(PORT, () =>{
    console.log(`Listening on PORT ${PORT}`)
})