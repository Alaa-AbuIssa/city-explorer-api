'use strict'

const axios = require('axios');
module.exports = moviesHandler;


// http://localhost:3001/movies?city=amman
// https://api.themoviedb.org/3/search/movie?api_key=3a4f02a4bced4b37af4537c4fff9ea5d&query=amman

let inMemory = {};

function moviesHandler(req, res) {
    let cityQuery = req.query.city;
    let key = process.env.MOVIE_API_KEY;
    // let key = '3a4f02a4bced4b37af4537c4fff9ea5d';
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query==${cityQuery}`
    
    class Movie {
        constructor(item) {
            this.title = item.title,
                this.overview = item.overview,
                this.average_votes = item.vote_average,
                this.total_votes = item.vote_count,
                this.image_url = item.poster_path,
                this.popularity = item.popularity,
                this.released_on = item.release_date
        }
    }
    


    if (inMemory[cityQuery] != undefined) {
        console.log('Getting data from Memory');
        res.send(inMemory[cityQuery]);
    } else {
        console.log('Getting data from API');
        axios
            .get(url)
            .then(result => {
                console.log('inside promise');
                let cityData = result.data.results.map(movieItem => {
                    return new Movie(movieItem)
                })
                inMemory[cityQuery] = cityData;
                // console.log(cityData);
                res.send(cityData);
            })
            .catch(err => {
                console.log('inside error');
                res.status(500).send(`error in getting data ==> ${err}`)
            })
    }
}
