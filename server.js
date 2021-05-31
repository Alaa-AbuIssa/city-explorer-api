'use strric';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
// const weather =require('./assets/weather.json');
// const PORT = 3001;
server.use(cors());


const PORT = process.env.PORT ;
const WEATHER_API_KEY=process.env.WEATHER_API_KEY;
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;

server.listen(PORT,() => {
  
  console.log( `Listening on PORT ${PORT}`); 
  
})

server.get('/weather',gettingWeather)
server.get('/movies',gettingMovies)



class ForeCast {
        
  constructor(object){
    
      
    
       this.description=`Low of : ${object.low_temp} and a high of ${object.max_temp} with a ${object.weather.description} `
       this.date= object.valid_date;
      
  
    }
  }



//weather function 
function  gettingWeather(request,response) {
  let city=request.query.desired_city;
  
  let weathUrlReq=`http://api.weatherbit.io/v2.0/current?city=${city}&key=${WEATHER_API_KEY}`
   
  axios
  .get(weathUrlReq)
  .then(results=>{
      let result=results.data.data[0];
      console.log('resul.data.data',result);
      let forecasts=new ForeCast(result);
      response.status(200).send(forecasts);

  })
  .catch(err=>{
      response.status(500).send(`error in getting data ==> ${err}`)
  })
}


//  movies function 
// https://api.themoviedb.org/3/search/movie?api_key=3a4f02a4bced4b37af4537c4fff9ea5d&query=
function gettingMovies(request,response) {
  let movie=request.query.desired_city;

  let movieUrlReq=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${movie}`;
  axios
  .get(movieUrlReq)
  .then(results=>{
      let movies=results.data.results;
      response.send(movies);
  })
}


server.get('*', (req, res) => {
  res.status(500).send(  '"error": "Something went wrong."');
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

