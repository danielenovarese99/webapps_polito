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

    this.getFilms = () => {
        return this.films;
    }
}



export default FilmLibrary;