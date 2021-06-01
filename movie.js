const axios = require('axios');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;




//  movies function 
// https://api.themoviedb.org/3/search/movie?api_key=3a4f02a4bced4b37af4537c4fff9ea5d&query=
function gettingMovies(request, response) {
    let movie = request.query.desired_city;
  
    let movieUrlReq = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${movie}`;
    axios
      .get(movieUrlReq)
      .then(results => {
        let movies = results.data.results;
        response.send(movies);
      })
  }

  module.exports=gettingMovies;