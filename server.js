'use strict'

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
const server = express();
server.use(cors());    //make server opened for anyone
const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log('Server Listining');
})



// http://localhost:3001/test
// server.get('/test', (req, res) => {
//     res.status(200).send('hello from back end');
// })


const weatherHandler = require('./modules/weather')
server.get('/weather', weatherHandler)



const moviesHandler = require('./modules/movies')
server.get('/movies', moviesHandler)


server.get('*', (req, res) => {
    res.send('Error: Something went wrong.');
})
