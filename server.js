
'use strict'

require ('dotenv').config();

const express=require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const server = express();
server.use(cors());
const PORT = process.env.PORT;

server.listen(PORT,()=>{
    console.log(`listing on Port : ${PORT}`);
})


// http://localhost:3001/photo?searchQuery=book
server.get('/photo',photoHandler);

async function photoHandler (req,res){
    let photoQuery=req.query.searchQuery
    let key = 'VzowFHda5oPwJMjLKpmwk1tT4sNcMxLHkYFVSPLOYnI';
    // console.log("heloo photo");
    // res.status(200).send("wait me until getting your photo")
    let url=`https://api.unsplash.com/search/photos?query=${photoQuery}&client_id=${key}`;

    try{

        const result = await axios.get(url);
        let bookInfo = result.data.results
        let req = bookInfo.map(item=>{
            return item.id
        })
    
        res.send(req)
        // console.log(result);
    }catch(error){
        res.send(`sorry you have a ${error} error! `)
    }


    

}

server.get('/',(req,res)=>{
    res.status(200).send("welcome to your home route")
})

server.get('*',(req,res)=>{
    console.log("some Page else");
    res.status(404).send("sorry we can't find your page")
})