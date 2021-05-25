'use strict';



const express = require('express');
const weather = require('./assets/weather.json')
require('dotenv').config();

const server = express();

const PORT = process.env.PORT;



server.listen(PORT,()=>{

    console.log(`Listing for request!! from your ${PORT}`);
})




// class Forecast {
//     date = 66565;
//     description = "";
// }


// let forecastObjArray ={};

// server.get('/weather',(req,res)=>{
//     let city = weather.map(item=>{
//         return Math.max.apply(null, item);

//     })
//     res.send(city)
//     console.log(city);
// })



// http://localhost:3001/weather?lat= 47.60621&lon=-122.33207&searchQuery=Seattle
server.get('/weather',(req,res)=>{
    console.log(req.query);
    let city = weather.find(item=>{
        if(item.city_name==req.query.searchQuery && item.lat==req.query.lat&& item.lon==req.query.lon)
        return item
        
    })
    res.send(city)
    // console.log(weather);
})


server.get('*',(req,res)=>{
    res.status(404).send('Sorry! Your Page Not Found')
})