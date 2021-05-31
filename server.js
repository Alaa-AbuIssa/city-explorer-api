'use strric';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
// const weather =require('./assets/weather.json');
// const PORT = 3001;
server.use(cors());

require('./weather');
 require('./movie');

const PORT = process.env.PORT;
// const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
// const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

server.listen(PORT, () => {

  console.log(`Listening on PORT ${PORT}`);

})

server.get('/weather', gettingWeather)
server.get('/movies', gettingMovies)




server.get('*', (req, res) => {
  res.status(500).send('"error": "Something went wrong."');
})



// server.get('/weather',(req,res)=>{
//   let searchQuery = req.query.cityname;

//   let city = weather.find(item=>{
//     if (searchQuery.toLocaleLowerCase() == item.city_name.toLocaleLowerCase() ){

//       return item;
//     }
//   });

//       try {

//         let forecasts = city.data.map(item => {

//           return new ForeCast(item);
//         });
//         res.send(forecasts);
//       } 

//       catch {
//         res.status(404).send('OPS!! Your City Not Found');
//       }

// })

