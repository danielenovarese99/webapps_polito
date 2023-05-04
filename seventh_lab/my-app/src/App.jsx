import './App.css'
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import AddMovie from '../components/AddMovie';
import Notfound from '../components/Notfound';
import Layout from '../screens/Layout';
import EditMovie from '../components/EditMovie';
import Movies from '../Movies';
import Film from '../classes/Film';
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

  let [mymovies, setMyMovies] = useState(movies);
  let [movieCount, setMovieCount] = useState(7);

  let addNewMovie = (newMovie) => {
    setMyMovies(mymovies => {
      let newmovies = [...mymovies, newMovie];
      setMovieCount(movieCount => { return movieCount + 1; })
      console.log(newmovies);
      return newmovies;
    })
  }
  let deleteMovie = (deleteId) => {
    setMyMovies(mymovies => {
      console.log("Deleting movie with id " + deleteId);
      let newmovies = mymovies.filter(element => element.id != deleteId);
      return newmovies;
    })
  }

  let updateMovie = (newMovie) => {
    setMyMovies(mymovies => {
      let newmovies = mymovies.map(element => {
        if(element.id == newMovie.id){
          return newMovie;
        }else{
          return element;
        }
      })
      return newmovies;
    })
  }

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

  
  return (
    <>
      <Movies.Provider value={{ movielist: mymovies, updatefunction: addNewMovie, count: movieCount, removefunction: deleteMovie,updatefunction: updateMovie}}>
        <Container fluid>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index path="Movies/:filter" element={<Homepage />} />
                <Route path="Addmovie" element={<AddMovie />} />
                <Route path="editMovie" element={<EditMovie />} />
                <Route path="*" element={<Notfound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Container>
      </Movies.Provider>
    </>
  )
}

/*
index route >> all questions
questions/:questionID
questions/:questionID/addAnswer >> show form to add answer
questions/:questionID/editANswer/:answerID >> show form to edit answer 
* >>
*/


export default App
