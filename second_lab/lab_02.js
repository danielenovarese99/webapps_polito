'use strict';
const dayjs = require('dayjs');
const sqlite3 = require('sqlite3');




let count = 0;

function Film(id, title, watchdate = undefined, favorite = false, rating = 0) {
    this.id = id;
    this.title = title;
    this.favorite = favorite === true ? 1 : 0;
    this.watchdate = watchdate === undefined ? undefined : dayjs(watchdate);
    this.rating = rating;
}

function FilmLibrary(libraryName = "Library" + (count++)) {
    this.libraryName = libraryName;
    this.films = [];

    this.addNewFilm = (Film) => {
        this.films.push(Film);
        //console.log("movie ${Film.title} added");
    };

    this.printAllMovies = () => {
        this.films.forEach(element => {
            console.log(`id: ${element.id}, title: ${element.title}, watchdate: ${element.watchdate == undefined || null ? undefined : element.watchdate.toString()}, favorite: ${element.favorite}, score: ${element.rating}`);
        });
    }

    this.sortBywatchdate = () => {
        let newlib = [...this.films].sort((e1, e2) => {
            if (e1.watchdate === undefined) return 1;
            else if (e2.watchdate === undefined) return -1;
            else {
                return e1.watchdate.isAfter(e2.watchdate) ? 1 : -1;
            }
        });
        return newlib;
    }

    this.getMoviesFromDb = (myDB) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM films";
            myDB.all(sql, [], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            })
        })
    }

    this.getFavoriteMoviesFromDb = (myDB) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM films WHERE favorite = 1";
            myDB.all(sql, [], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

    this.getWatchedToday = (myDB) => {
        return new Promise((resolve, reject) => {
            let todaysDate = dayjs(); // get today's date - later on will format it accordingly to DB date format
            let sql = "SELECT * FROM films WHERE watchdate = ?";
            myDB.all(sql, [todaysDate.format('YYYY-MM-DD')], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        });
    }


    this.getWatchedBeforeToday = (myDB) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM films";
            let todaysDate = dayjs();
            myDB.all(sql, [], (err, result) => {
                if (err) reject(err);
                else {
                    /// filter the results and return the filtered array of results
                    let results = [];
                    let tempDate;
                    result.forEach((e) => {
                        tempDate = dayjs(e["watchdate"]);
                        if (todaysDate.isAfter(tempDate)) {
                            results.push(e);
                        }
                    })
                    resolve(results);
                }
            })
        })
    }

    this.getFilmsFromRating = (myDB, rating) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM films WHERE rating >= ?";
            myDB.all(sql, [rating], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

    this.getFilmsByString = (myDB, inputString) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM films";
            let inputStr = inputString.toLowerCase();
            myDB.all(sql, [], (err, result) => {
                if (err) reject(err);
                else {
                    let resultArray = [];
                    result.forEach(e => {
                        if (e["title"].toLowerCase().includes(inputStr)) resultArray.push(e);
                    })
                    resolve(resultArray);
                }
            })
        })
    }



    this.insertNewFilmInDB = (myDB, Film) => {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO films VALUES (?,?,?,?,?)";
            myDB.run(sql, [Film.id, Film.title, Film.favorite, Film.watchdate.format('YYYY-MM-DD'), Film.rating], (err) => {
                if (err) reject(err);
                else resolve("Done");
            })
        })
    }


    this.deleteFilmFromDB = (myDB, id) => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM films WHERE id = ?";
            myDB.run(sql, [id], (err) => {
                if (err) reject(err);
                resolve("Done");
            })
        })
    }

    this.unwatchAllMoviesFromDB = (myDB) => {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE films SET watchdate = ?";
            myDB.run(sql, [], (err) => {
                if (err) reject(err);
                resolve("Done");
            })
        })
    }


    this.deleteFilm = (id) => { this.films = this.films.filter(element => element.id !== id) };

    this.resetWatchedFilms = () => this.films.forEach(element => {
        if (element.watchdate !== undefined) element.watchdate = undefined;
    })

    this.getRated = () => {
        console.log("Printing all rated movies by best score!");
        let newmovies = [...this.films].filter(element => element.rating > 0).sort((e1, e2) => e1.rating > e2.rating ? -1 : 1);
        newmovies.forEach(element => console.log(`id: ${element.id}, title: ${element.title}, watchdate: ${element.watchdate === undefined ? undefined : element.watchdate.toString()}, favorite: ${element.favorite}, score: ${element.rating}`));
    }
}




function main() {

    const db = new sqlite3.Database('./second_lab/films.db', (err) => {
        if (err) console.log(err);
        else console.log("Films database opened succesfully!");
    });
    /*
    movieLibrary1.addNewFilm(new Film(1, "Pulp fiction", "03 09 2023",false,2));
    movieLibrary1.addNewFilm(new Film(2, "21 grams", "05 09 2023",false,3));
    movieLibrary1.addNewFilm(new Film(3, "Star Wars", "06 09 2023",false,5));
    movieLibrary1.addNewFilm(new Film(4, "Matrix", "03 09 2022",false,1));
    movieLibrary1.addNewFilm(new Film(5, "Shrek",undefined,false,1));
    */
    //movieLibrary1.sortBywatchdate().forEach(element => console.log(`id: ${element.id}, title: ${element.title}, watchdate: ${element.watchdate === undefined ? undefined : element.watchdate.toString()}, favorite: ${element.favorite}, score: ${element.rating}`));

    //movieLibrary1.deleteFilm(1);
    //movieLibrary1.resetWatchedFilms();
    //movieLibrary1.getRated();
    const movieLibrary1 = new FilmLibrary();


    /*
    // INSERTING A MOVIE INTO DB
    let newmovie = new Film(null, "XXX tentacion Life Documentary", "03 16 2023", true, 5);
    movieLibrary1.insertNewFilmInDB(db, newmovie).then((result, err) => {
        if (err) console.log(err);
        else {
            console.log(result);
            movieLibrary1.getMoviesFromDb(db).then((result, err) => {
                if (err) console.log(err);
                else {
                    result.forEach(e => console.log(e));
                }
            })
        }
    });




    // DELETE FILM FROM DB
     movieLibrary1.deleteFilmFromDB(db,6).then((result,error) => {
        if(error) console.log(error);
        else console.log(result);
    })


    // UNWATCH ALL MOVIES
    
    movieLibrary1.unwatchAllMoviesFromDB(db).then((result, error) => {
        if (error) console.log(error);
        else console.log(result);
    })



    /// PRINT ALL MOVIES AFTER MAKING CHANGES
    */







}


main();
