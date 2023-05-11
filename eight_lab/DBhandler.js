const e = require('express');
const sqlite = require('sqlite3');
function Film(title, favorite, watchdate, rating) {
    this.title = title;
    this.favorite = favorite;
    this.watchdate = watchdate;
    this.rating = rating;
}

// OPEN DB
const db = new sqlite.Database('./DB/films.db', (err) => {
    if (err) {
        console.log("Error opening the database.");
    }
    else {
        console.log("Films db opened succesfully");
    }
});

/// RETURNS ALL MOVIES
// with filter if specified
exports.listMovies = (filter = undefined) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films;';

        db.all(query, [], (err, rows) => {
            if (err) reject(err);
            else {
                let movies = rows.map((E) => new Film(E.title, E.favorite, E.watchdate, E.rating));
                if (filter == undefined) {
                    resolve(movies);
                }
                else {
                    switch (filter) {
                        case 'favorites':
                            movies = movies.filter((E) => E.favorite == 1);
                            break;
                        case 'best-rated':
                            movies = movies.filter((E) => E.rating == 5);
                            break;
                        case 'unseen':
                            movies = movies.filter((E) => E.watchdate == null || E.watchdate == "");
                            break;
                    }
                    resolve(movies);
                }
            }
        })
    })
};


exports.retrieveMovie = (id) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM films WHERE id = ?';
        db.all(query, [id], (err, rows) => {
            if (err) reject(err);

            const movies = rows.map((E) => new Film(E.title, E.favorite, E.watchdate, E.rating));
            resolve(movies);
        })
    })
};

function getLatestID(){
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM films';
        db.all(query, [], (err, result) => {
            if (err) reject(err);
            let last_used_id = result[result.length - 1].id;
            resolve(last_used_id);
        })
    })
}


exports.createMovie = (title, favorite, watchdate, rating) => {
    return new Promise((resolve, reject) => {
        let query = 'INSERT INTO films VALUES (?,?,?,?,?,?)';
        let id;
        getLatestID()
            .then((result) => {
                id = result+1;

                console.log(id);
                db.all(query, [id, title, favorite, watchdate, rating, 0], (err) => {
                    if (err) reject(err);
                    resolve("Done");
                })
            })
            .catch((err) => { console.log("Error in retrieving last available id " + err); })


    })
};

exports.updateMovie = (id, title, favorite, watchdate, rating) => {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE films SET title = ?, favorite = ?, watchdate = ?, rating = ? WHERE id = ?';
        db.all(query, [title, favorite, watchdate, rating, id], (err) => {
            if (err) reject(err);
            resolve("Done");
        })
    })
};

exports.updateRating = (id, action) => {
    return new Promise((resolve, reject) => {
        let query;
        switch (action) {
            case "upvote":
                query = 'UPDATE films SET rating = rating + 1 WHERE id = ?';
                break;
            case "downvote":
                query = 'UPDATE films SET rating = rating - 1 WHERE id = ?';
                break;
        }

        db.all(query, [id], (err) => {
            if (err) reject(err);
            resolve("Done");
        })
    })
}

exports.updateFavorite = (id, newFavorite) => {
    return new Promise((resolve, reject) => {
        let query;
        switch (newFavorite) {
            case 1:
                query = 'UPDATE films SET favorite = "1" WHERE id = ?';
                break;
            case 0:
                query = 'UPDATE films SET favorite = "0" WHERE id = ?';
                break;
        }

        db.all(query, [id], (err) => {
            if (err) reject(err);
            resolve("Done");
        })
    })
};




exports.deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
        let query = 'DELETE FROM films WHERE id = ?';
        db.all(query, [id], (err) => {
            if (err) reject(err);
            resolve("Done");
        })
    })
}


