import Question from './Questions'
import Answer from './Answers'; // answer object
import Answers from './components/Answercomponent'; // asnwers component
import TopNavBar from './components/TopNavBar';
import { Container, Row, Col, Navbar } from 'react-bootstrap'
import './App.css'

const fakeQuestion = new Question("Chi muore a pasquetta?", "Daniele", "2023-02-07");
const answers = [
  // response, respname, score, date
  { response: "Daniele", respName: "Daniele", score: 0, date: new Date() },
  { response: "Luca", respName: "Anon", score: 0, date: new Date() },
  { response: "Marco", respName: "Rob", score: 0, date: new Date() },
  { response: "Rob", respName: "Luca", score: 0, date: new Date() },
]
fakeQuestion.answers = answers;


function App() {

  return (
    <>
      <Container fluid>
        <TopNavBar title={fakeQuestion.question}></TopNavBar>
        <Answers answers={fakeQuestion.getAnswers()} />
      </Container>

    </>
  )
}

export default App
