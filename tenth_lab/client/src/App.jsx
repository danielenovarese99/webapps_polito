import './App.css'
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notfound from '../components/Notfound';
import Layout from '../screens/Layout';
import MovieList from '../components/MovieList';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
        <Container fluid>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index path="Movies/:filter" element={<MovieList />} />
                <Route path="*" element={<Notfound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Container>
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
