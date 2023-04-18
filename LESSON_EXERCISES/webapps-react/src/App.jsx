import Question from './Questions'
import Answer from './Answers'; // answer object
import Answers from './components/Answercomponent'; // asnwers component
import TopNavBar from './components/TopNavBar';
import { Container, Row, Col, Navbar } from 'react-bootstrap'
import './App.css'
import { useState } from 'react';

const fakeQuestion = new Question("Statistiche pasquetta", "Daniele", "2023-02-07");
const answers = [
  // response, respname, score, date
  {id: 1,response: "Daniele", respName: "Daniele", score: 12, date: new Date() },
  {id: 2,response: "Luca", respName: "Anon", score: 50, date: new Date() },
  {id: 3,response: "Marco", respName: "Rob", score: -12, date: new Date() },
  {id: 4,response: "Rob", respName: "Luca", score: 666, date: new Date() },
]
fakeQuestion.answers = answers;


function App() {
  const [questions,setQuestions] = useState(fakeQuestion);
  const [stateAnswers, setStateAnswers] = useState(answers);
  ///better here as we don't have to pass answers as props before setting state
  /// (that would cause bugs)

  // we also need to define functions to change the states accordingly >> we need to pass something that identifies the specific answer
  const voteUp = (answerId) => {
    // i need to redefine ALL state variables >>>> this means the entire answer array

    // call defined setstate function
    setStateAnswers(stateAnswers => {
      return stateAnswers.map(el => {

        if(el.id === answerId){
          return new Answer(el.id,el.response,el.respName,el.date,el.score+1); // redefine entire object 
        }
        else{
          return el;
        }
      })
    })
  }
  /// add a new answer >>> copy old answers + add new one at the end
  const addAnswer = (answer) => {
    setStateAnswers((stateAnswers) => {
      return [...stateAnswers,answer];
    })
  }
  const updateAnswer = (answer) =>{
    setStateAnswers(stateAnswers => {
      return stateAnswers.map(e1 => {
        if(e1.id === answer.id){
          return new Answer(e1.id,answer.response,answer.respName,answer.date,answer.score);
        }
        else{
          return e1;
        }
      })
    })
  }

  return (
    <>
      <Container fluid>
        <TopNavBar title={questions.question}></TopNavBar>
        <Answers answers={stateAnswers} voteUp={voteUp} addAnswer={addAnswer} updateAnswer={updateAnswer}/> 
      </Container>

    </>
  )
}

export default App
