import './App.css'
import NavBarComponent from '../components/NAVBARcomponent'
import { Container, Row, Col } from 'react-bootstrap';
import Film from '../classes/Film';
import FilmLibrary from '../classes/FilmLibrary';
import MovieBody from '../components/MOVIELISTcomponent'

//import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  const movies = [
    new Film(1, "Pulp fiction", "04 09 2023", true, 2),
    new Film(2, "21 grams", "04 09 2023", false, 3),
    new Film(3, "Star Wars", "05 09 2023", false, 5),
    new Film(4, "Matrix", "06 09 2022", true, 1),
    new Film(5, "Shrek", undefined, false, 1),
  ];

  const mylib = new FilmLibrary("daniele's lib");
  movies.map(element => mylib.addNewFilm(element));

  return (
    <>
      <Container fluid>
        <NavBarComponent />
        <MovieBody movielib={mylib.getFilms()}/>
      </Container>
    </>
  )
}

export default App
