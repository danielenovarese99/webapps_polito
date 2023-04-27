import './App.css'
import NavBarComponent from '../components/NAVBARcomponent'
import { Container, Row, Col } from 'react-bootstrap';
import Film from '../classes/Film';
import FilmLibrary from '../classes/FilmLibrary';
import MovieBody from '../components/MOVIELISTcomponent'
import { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';


let movies = [
  new Film(1, "Pulp fiction", "04 09 2023", true, 2),
  new Film(2, "21 grams", "04 09 2023", false, 3),
  new Film(3, "Star Wars", "05 09 2023", false, 5),
  new Film(4, "Matrix", "06 09 2022", true, 1),
  new Film(5, "Shrek", undefined, false, 1),
];


function App() {



  const Filters = [
    { name: 'All', value: 0 },
    { name: 'Favorites', value: 1 },
    { name: 'Best Rated', value: 2 },
    { name: 'Seen Last month', value: 3 },
    { name: 'Unseen', value: 4 },
  ];


  let [mymovies, setMyMovies] = useState(movies);
  let [currentFilter, setCurrentFilter] = useState(0);
  let [movieCount, setMovieCount] = useState(7);

  let modifymovies = (newFilter, newMovie) => {
    setMyMovies(mymovies => {
      return movies.map(element => {
        if (element.id == newMovie.id) {
          console.log(newMovie);
          return new Film(element.id, newMovie.title, newMovie.date, newMovie.favorite, newMovie.rating);
        }
        else {
          return element;
        }
      })
    })
    //})
  }

  let updatemovies = (newFilter, newMovie = null) => {

    // no new movie is specified - just sort the current one according to selected filter
    setCurrentFilter(currentFilter => { return newFilter });
    setMovieCount(movieCount => { return movieCount + 1 });
    if (newMovie != null) {
      movies.push(newMovie);
      setMyMovies(mymovies => {
        let newmovies;


        if (newFilter == 0) {
          return [...movies];
        }
        /// FAVORITES
        else if (newFilter == 1) {
          newmovies = [...movies].filter(element => element.favorite === true);
          return newmovies;
        }
        /// BEST RATED
        else if (newFilter == 2) {
          newmovies = [...movies].filter(element => element.rating === 5);
          return newmovies;
        }
        /// SEEN LAST MONTH
        else if (newFilter == 3) {
          newmovies = [...movies].filter(element => {
            let currentDate = new Date();
            if (element.date instanceof Date) {
              if (element.date.getMonth() == currentDate.getMonth()) {
                return element;
              }
            }
          });
          return newmovies;
        }
        /// NEVER SEEN
        else if (newFilter == 4) {
          newmovies = [...movies].filter(element => {
            if ((!(element.date instanceof Date))) {
              return element;
            }
          });
          return newmovies;
        }
      })
      //})
      return;
    }
    else {
      /// just return the old array  and then sort it accordingly to selected filter
      setMyMovies(mymovies => {
        let newmovies;

        if (newFilter == 0) {
          return [...movies];
        }
        /// FAVORITES
        else if (newFilter == 1) {
          newmovies = [...movies].filter(element => element.favorite === true);
          return newmovies;
        }
        /// BEST RATED
        else if (newFilter == 2) {
          newmovies = [...movies].filter(element => element.rating == 5);
          return newmovies;
        }
        /// SEEN LAST MONTH
        else if (newFilter == 3) {
          newmovies = [...movies].filter(element => {
            let currentDate = new Date();
            if (element.date instanceof Date) {
              if (element.date.getMonth() == currentDate.getMonth()) {
                return element;
              }
            }
          });
          return newmovies;
        }
        /// NEVER SEEN
        else if (newFilter == 4) {
          newmovies = [...movies].filter(element => {
            if ((!(element.date instanceof Date))) {
              return element;
            }
          });
          return newmovies;
        }
      })
      return;
    }

  }





  // dont really need a filmlibrary, unless we want to display its title...
  //const mylib = new FilmLibrary("daniele's lib");
  //movies.map(element => mylib.addNewFilm(element));


  return (
    <>
      <Container fluid>
        <NavBarComponent />
        <MovieBody movielib={mymovies} updatemovielist={updatemovies} filter={currentFilter} movieCount={movieCount} modifyMovie={modifymovies} />
      </Container>
    </>
  )
}

export default App
