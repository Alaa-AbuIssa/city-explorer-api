'use strict';

const express = require('express');
const weather = require('./assets/weather.json');
const cors = require ('cors');
require('dotenv').config();

const server = express();
server.use(cors());

const PORT = process.env.PORT;



server.listen(PORT,()=>{
    console.log(`Listing for request!! from your ${process.env.PORT} PORT`);
})


class ForeCast {
    constructor(object) {
        this.date = object.valid_date; 
        this.description = `Low of ${object.low_temp}, high of ${object.max_temp} with ${object.weather.description}`;
    }
}


// http://localhost:3001/weather?lat= 47.60621&lon=-122.33207&searchQuery=Seattle
server.get('/weather',(req,res)=>{
    // console.log(req.query);

    let cityData = weather.find(item=>{
        if(item.city_name.toLocaleLowerCase()==req.query.searchQuery.toLocaleLowerCase() && item.lat==req.query.lat && item.lon==req.query.lon){
            
            return item
        }
        
    })
    // res.send(cityData)
    // console.log(weather);
    


    try {

        let forecasts = cityData.data.map(item => {
            return new ForeCast(item);
        })
        // console.log(forecasts);
        res.send(forecasts);
    } 
    catch {
        res.status(404).send('Sorry! there is no city with your informations');
    };
})


server.get('*',(req,res)=>{
    res.status(500).send('Sorry! Your Page Not Found')
})



