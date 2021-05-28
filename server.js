'use strric';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const weather =require('./assets/weather.json');
// const PORT = 3001;
const PORT = process.env.PORT ;
server.use(cors());



server.listen(PORT,() => {
  
  console.log( `Listening on PORT ${PORT}`); 
  
})


      class ForeCast {
        
        constructor(object){
          
            
          
             this.description=`Low of : ${object.low_temp} and a high of ${object.max_temp} with a ${object.weather.description} `
             this.date= object.valid_date;
            
        
          }
        }
        
server.get('/weather',(req,res)=>{
  let searchQuery = req.query.cityname;

  let city = weather.find(item=>{
    if (searchQuery.toLocaleLowerCase() == item.city_name.toLocaleLowerCase() ){

      return item;
    }
  });
  
      try {
        
        let forecasts = city.data.map(item => {
          
          return new ForeCast(item);
        });
        res.send(forecasts);
      } 
      
      catch {
        res.status(404).send('OPS!! Your City Not Found');
      }
      
})



server.get('*', (req, res) => {
  res.status(500).send(  '"error": "Something went wrong."');
})