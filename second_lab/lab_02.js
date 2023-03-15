'use strict';
const dayjs = require('dayjs');

///
///
///
// esercizio 0

//warmUpExercise(["c","it","cat","spring"]);
function warmUpExercise(Strings) {
    Strings.forEach(element => {
        if (element.length < 2) {
            console.log("Error > string is shorter than 2");
        }
        else if (element.length >= 2) {
            let tempStr = "" + element.charAt(0) + element.charAt(1) + element.charAt(element.length - 2) + element.charAt(element.length - 1);
            console.log(tempStr);
        }
    });
}

///
///
///
// esercizio 1
let count = 0;

function Film(id, title, date = undefined, favorite = false, rating = 0) {
    this.id = id;
    this.title = title;
    this.date = date === undefined ? undefined : dayjs(date);
    this.favorite = favorite;
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
            console.log(`id: ${element.id}, title: ${element.title}, date: ${element.date === undefined ? undefined : element.date.toString()}, favorite: ${element.favorite}, score: ${element.rating}`);
        });
    }

    this.sortByDate = () => {
        let newlib = [...this.films].sort((e1,e2) =>
        {
            if(e1.date === undefined) return 1;
            else if(e2.date === undefined) return -1;
            else{
                return e1.date.isAfter(e2.date)? 1 : -1;
            }
        });
        return newlib;
    }


    this.deleteFilm = (id) => {this.films = this.films.filter(element => element.id !== id)};

    this.resetWatchedFilms = () => this.films.forEach(element =>{
        if(element.date !== undefined) element.date = undefined;
    })

    this.getRated = () => {
        console.log("Printing all rated movies by best score!");
        let newmovies =  [...this.films].filter(element => element.rating > 0).sort((e1,e2) => e1.rating > e2.rating ? -1 : 1);
        newmovies.forEach(element =>  console.log(`id: ${element.id}, title: ${element.title}, date: ${element.date === undefined ? undefined : element.date.toString()}, favorite: ${element.favorite}, score: ${element.rating}`));
    }
}

const movieLibrary1 = new FilmLibrary();
movieLibrary1.addNewFilm(new Film(1, "Pulp fiction", "03 09 2023",false,2));
movieLibrary1.addNewFilm(new Film(2, "21 grams", "05 09 2023",false,3));
movieLibrary1.addNewFilm(new Film(3, "Star Wars", "06 09 2023",false,5));
movieLibrary1.addNewFilm(new Film(4, "Matrix", "03 09 2022",false,1));
movieLibrary1.addNewFilm(new Film(5, "Shrek",undefined,false,1));

//movieLibrary1.sortByDate().forEach(element => console.log(`id: ${element.id}, title: ${element.title}, date: ${element.date === undefined ? undefined : element.date.toString()}, favorite: ${element.favorite}, score: ${element.rating}`));

movieLibrary1.deleteFilm(1);
movieLibrary1.resetWatchedFilms();
movieLibrary1.getRated();