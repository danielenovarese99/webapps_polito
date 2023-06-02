'use strict';



const express = require('express');
const db = require('./DBhandler');
const app = express();
const port = 3001;
/// below are essential parts of user-login and authentication - cookies, session + CORS + passport MODULE
const cors = require('cors');
const passport = require('passport');
const Localstrategy = require('passport-local');
const session = require('express-session');






app.use(express.json());
//app.use(morgan('dev'));
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));
//     origin: 'http://localhost:3001',

passport.use(new Localstrategy(function verify(username, password, cb) {
    db.retrieveUser(username, password)
        .then((user) => {
            if (!user) {
                return cb(null, false, { message: "incorrect email / password" });
            }
            return cb(null, user);
        })
}));

passport.serializeUser((user, cb) => {
    cb(null, { id: user.id, name: user.name, email: user.email });
})
passport.deserializeUser((user, cb) => {
    return cb(null, user);
})

/*
FUNCTIONS FOR HANDLING PROTECTED ROUTES
*/
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(405).json({ error: "You need to login to perform this action." });
}

app.use(session({
    secret: "0_0",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.authenticate('session'));




// TESTING
/// INSERT NEW USER
/*
app.post('/api/special/insertuser', (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    db.insertUser(email, name, password).then((result) => {
        if (result) {
            res.status(200).json({ message: "User inserted succesfully" });
        }
    })
        .catch(err => {
            console.log("|!| error in db query");
            console.log(err);
            res.status(500).json({ error: err });
        })
})

app.post('/api/special/trylogin', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    db.retrieveUser(email, password)
        .then((result) => {
            if(result){
                console.log("Passwords are the same");
                res.status(200).json({data : result});
            }
            else{
                res.status(200).json({error : 'Passwords are not the same'});
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        }
        );
})
*/

// END OF TESTING
/// LOGIN POST ROUTE


app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({ data: { username: req.user.name, email: req.user.email, id: req.user.id } });
})

app.post('/api/logout', (req, res) => {
    req.logout(() => {
        res.status(200).end();
    });
})
/*
app.post('/api/sessions',passport.authenticate('local'),(req,res) => {
    console.log(req.user);
    res.status(200).json({data: {username: req.user.name, email: req.user.email, id: req.user.id}});
})
*/
app.get('/api/sessions/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
    }
    else {
        res.status(401).json({ error: "You are not authenticated" });
    }
})




/// GET ALL FILMS - WORKS

app.get('/api/films', isLoggedIn, (req, res) => {
    /// CHECK FIRST IF ANY QUERY PARAMETER IS DEFINED.
    let queryFilter = req.query.filter;
    // the point of this if() statement is that, if a filter is defined but not valid, set it as undefined.
    if (queryFilter != "favorites" && queryFilter == "best-rated" && queryFilter == "unseen") {
        queryFilter = undefined;
    }
    /// new -> filter accordingly to user_id (only show logged in user's movies)
    let userid_filter = req.user.id;
    db.listMovies(queryFilter)
        .then((response) => {
            //const final_response = response.filter(e => e.userid == filter_id); // filter response data to only show the movies with logged in user's data
            res.status(200).json({ movies: response.filter(e => e.userid == userid_filter) });
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});



// GET FILM GIVEN ID - WORKS
app.get('/api/films/:id', (req, res) => {
    let myid = req.params.id;
    db.retrieveMovie(myid)
        .then((result) => res.status(200).json({ result: result }))
        .catch((err) => res.send(err));
});


/// CREATE NEW FILM - WORKS
app.post('/api/films', (req, res) => {

    //console.log(req.body);


    let title = req.body.title;
    let favorite = req.body.favorite;
    let watchdate = req.body.watchdate;
    let rating = req.body.rating;


    if (title === undefined || favorite === undefined || watchdate === undefined || rating === undefined || title.length > 12 || (favorite != '0' && favorite != '1')) {
        res.status(422).json({ message: 'Invalid data' }); // wrong data - 422
        return;
    }

    console.log(" " + title + favorite + watchdate + rating);

    favorite = parseInt(favorite);
    rating = parseInt(rating);

    db.createMovie(title, favorite, watchdate, rating)
        .then(() => res.status(200).json({ success: true, status: 200 }).end()) // success - 200
        .catch((err) => res.send(err)); // error - 500
})



/// UPDATE EXISTING FILM - to be tested
app.put('/api/films/:id', (req, res) => {
    let title = req.body.title;
    let favorite = req.body.favorite;
    let watchdate = req.body.watchdate;
    let rating = req.body.rating;

    //console.log(req.body);

    if (title === undefined || favorite === undefined || watchdate === undefined || rating === undefined || title.length > 12 || (favorite != '0' && favorite != '1' && favorite != 1 && favorite != 0)) {
        res.status(422).json({ message: 'Invalid data' }); // wrong data - 422
        return;
    }


    let myid = req.params.id;
    db.updateMovie(myid, title, favorite, watchdate, rating)
        .then(() => res.status(200).json({ success: true, status: 200 }).end()) // success - 200
        .catch((err) => res.send(err + "Please make sure that the movies you are looking for exists.")) // error - 500 || Not found - 404
})


/// UPVOTE / DOWNVOTE A FILM - WORKS
app.post('/api/films/:id/vote', (req, res) => {
    let myid = req.params.id;
    let action = req.body.action;

    console.log(req.body);

    if (action != "upvote" && action != "downvote") {
        res.status(422).end(); // invalid action - 422
    }


    db.updateRating(myid, action)
        .then(() => res.status(200).json({ success: true, status: 200 }).end()) // success - 200
        .catch((err) => res.send(err)); // error - 500 || Not found - 404
});


/// SET FILM AS FAVORITE / UNSET - WORKS
app.post('/api/films/:id/favorite', (req, res) => {
    // save POST BODY REQ value >> if 1, try and set movie with given id as FAVORITE ( 1 )
    //                              if 0, try and set movie with given id as not favorite ( 0 )                
    let myid = req.params.id;
    let action = req.body.action;


    if (action != "1" && action != "0") {
        res.status(422).end(); // invalid action - 422
    }

    myid = parseInt(myid);
    action = parseInt(action);

    db.updateFavorite(myid, action)
        .then(() => res.status(200).json({ success: true, status: 200 }).end()) // success - 200
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
        .then(() => res.status(200).json({ success: true, status: 200 }).end()) // success - 200
        .catch((err) => res.send(err)) // error - 500 || Not found - 404
})
app.listen(port, () => console.log('Server ready on port ' + port));
