'use strict';



const express = require('express');
const db = require('./DBhandler');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors()); /// development only
//app.use(morgan('dev'));


/// GET ALL FILMS - WORKS

app.get('/api/films', (req, res) => {
    /// CHECK FIRST IF ANY QUERY PARAMETER IS DEFINED.
    let queryFilter = req.query.filter;
    // the point of this if() statement is that, if a filter is defined but not valid, set it as undefined.
    if (queryFilter != "favorites" && queryFilter == "best-rated" && queryFilter == "unseen") {
        queryFilter = undefined;
    }

    db.listMovies(queryFilter)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.send(err);
        })
});


 
// GET FILM GIVEN ID - WORKS
app.get('/api/films/:id', (req, res) => {
    let myid = req.params.id;
    db.retrieveMovie(myid)
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});


/// CREATE NEW FILM - WORKS
app.post('/api/films',(req,res) => {

    //console.log(req.body);


    let title = req.body.title;
    let favorite = req.body.favorite;
    let watchdate = req.body.watchdate;
    let rating = req.body.rating;
   

    if(title === undefined || favorite === undefined || watchdate === undefined || rating === undefined){
        res.status(422).end(); // wrong data - 422
    } 

    favorite = parseInt(favorite);
    rating = parseInt(rating);

    db.createMovie(title,favorite,watchdate,rating)
    .then(() => res.status(200).end()) // success - 200
    .catch((err) => res.send(err)); // error - 500
})



/// UPDATE EXISTING FILM - to be tested
app.put('/api/films/:id', (req, res) => {
    let title = req.body.title;
    let favorite = req.body.favorite;
    let watchdate = req.body.watchdate;
    let rating = req.body.rating;

    console.log(req.body);

    if(title == undefined || favorite == undefined || watchdate == undefined || rating == undefined){
        res.status(422).end(); // wrong data - 422
    }


    let myid = req.params.id;
    db.updateMovie(myid,title,favorite,watchdate,rating)
    .then(() => res.status(200).end()) // success - 200
    .catch((err) => res.send(err + "Please make sure that the movies you are looking for exists.")) // error - 500 || Not found - 404
})


/// UPVOTE / DOWNVOTE A FILM - WORKS
app.post('/api/films/:id/vote', (req, res) => {
    let myid = req.params.id;
    let action = req.body.action;

    console.log(req.body);

    if(action != "upvote" && action != "downvote"){
        res.status(422).end(); // invalid action - 422
    }


    db.updateRating(myid,action)
    .then(() => res.status(200).end()) // success - 200
    .catch((err) => res.send(err)); // error - 500 || Not found - 404
});


/// SET FILM AS FAVORITE / UNSET - WORKS
app.post('/api/films/:id/favorite', (req, res) => {
    // save POST BODY REQ value >> if 1, try and set movie with given id as FAVORITE ( 1 )
    //                              if 0, try and set movie with given id as not favorite ( 0 )                
    let myid = req.params.id;
    let action = req.body.action;

    
    if(action != "1" && action != "0"){
        res.status(422).end(); // invalid action - 422
    }

    myid = parseInt(myid);
    action= parseInt(action);

    db.updateFavorite(myid,action)
    .then(() => res.status(200).end()) // success - 200
    .catch((err) => res.send(err)); // error - 500 || Not found - 404

});


/// DELETE A FILM - WORKS
app.delete('/api/films/:id', (req, res) => {
    // try and delete movie with given id
    // return proper response

    let myid = req.params.id;
    myid = parseInt(myid);
    console.log("id = " + myid + typeof myid);

    db.deleteMovie(myid)
    .then(() => res.status(200).end()) // success - 200
    .catch((err) => res.send(err)) // error - 500 || Not found - 404
})
app.listen(port, () => console.log('Server ready on port ' + port));
