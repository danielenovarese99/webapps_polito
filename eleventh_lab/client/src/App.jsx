import './App.css'
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notfound from './components/Notfound';
import Layout from './screens/Layout';
import MovieList from './components/MovieList';
import Login from './components/Login';
import { useState } from 'react';
import loginContext from '../classes/loginContext';
import APIURL from './main';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  /// homepage should check for any cookies and set authorized to true / false and ID to cookie value
  const [loginState, setLoginState] = useState({ authorized: false, name: "", email: "", userid: "" });
  const perform_login = async (email, password) => {
    try {
      const result = await fetch(APIURL + "login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
        credentials: 'include',
      });
      if (result.ok) {
        if (result.status == 200) {
          const data = await result.json();
          setLoginState(() => {
            return { authorized: true, name: data.data.username, email: data.data.email, userid: data.data.id };
          })
        }
        else {
          alert('status code not 400 - wrong psw');
        }
      }
      else {
        alert('result not ok');
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const perform_logout = async () => {
    try {
      const result = await fetch(APIURL + "logout", {
        method: 'POST',
        credentials: 'include',
      })
      if (result.ok) {
        if (result.status == 200) {
          setLoginState(() => {
            return { authorized: false, name: "", email: "", userid: "" };
          })
          return true;
        }
      }
    }
    catch (err) {
      console.error(err);
      return false;
    }
  }


  /*
    useEffect(() => {
    async function checkAuthentication() {
      const result = await fetch(APIURL + 'sessions/current', {
        credentials: 'include'
      });
      if (result.ok) {
        if (result.status == 200) {
          const data = await result.json();
          setLoginState(() => {
            return { authorized: true, name: data.username, email: data.email, userid: data.id, }
          })
        }
        console.log('not logged in');
      }
      else {
        console.log("response not ok");
      }
    };
    checkAuthentication();
  }, []);
  */


  // TODO > add useEffect that checks wether user is logged in or not, and updates context.

  return (
    <>
      <Container fluid>
        <BrowserRouter>
          <loginContext.Provider value={{ loginstate: loginState }}>
            <Routes>
              <Route path="/" element={<Layout logoutaction={perform_logout} />}>
                <Route index path="Movies/:filter" element={<MovieList />} />
                <Route path="Login" element={<Login loginaction={perform_login} />} />
                <Route path="*" element={<Notfound />} />
              </Route>
            </Routes>
          </loginContext.Provider>
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
