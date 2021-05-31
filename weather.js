const axios= require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;


class ForeCast {

    constructor(object) {
  
      this.description = `Low of : ${object.low_temp} and a high of ${object.max_temp} with a ${object.weather.description} `
      this.date = object.valid_date;
  
    }
  }

  
//weather function 
function gettingWeather(request, response) {
    let city = request.query.desired_city;
  
    let weathUrlReq = `http://api.weatherbit.io/v2.0/current?city=${city}&key=${WEATHER_API_KEY}`
  
    axios
      .get(weathUrlReq)
      .then(results => {
        let result = results.data.data[0];
        console.log('resul.data.data', result);
        let forecasts = new ForeCast(result);
        response.status(200).send(forecasts);
  
      })
      .catch(err => {
        response.status(500).send(`error in getting data ==> ${err}`)
      })
  }

  module.exports = gettingWeather;