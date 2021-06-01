'use strict'

const axios = require('axios');
module.exports = weatherHandler;


// http://localhost:3001/weather?city=amman
// http://api.weatherbit.io/v2.0/current?&city=amman&key=API_KEY

let inMemory = {};

function weatherHandler(req, res) {
    let cityQuery = req.query.city;
    let key = process.env.WEATHER_API_KEY;
    // let key = 'a206c8fae1e24d3f9bb54732572f2bad';
    let url = `http://api.weatherbit.io/v2.0/current?city=${cityQuery}&key=${key}`

    

    if (inMemory[cityQuery] != undefined) {
        console.log('Getting data from Memory');
        console.log(inMemory[cityQuery]);
        res.send(inMemory[cityQuery]);
    } else {
        console.log('Getting data from API');
        axios
            .get(url)
            .then(result => {
                console.log('inside promise');
                let cityData = {
                    description: result.data.data[0].weather.description,
                    solarRad: result.data.data[0].solar_rad,
                    windSpd: result.data.data[0].wind_spd,
                    windDir: result.data.data[0].wind_dir,
                    temp: result.data.data[0].temp
                }
                inMemory[cityQuery] = cityData;
                console.log(cityData);
                res.send(cityData);
            })
            .catch(err => {
                console.log('inside error');
                res.status(500).send(`error in getting data ==> ${err}`)
            })
    }
}