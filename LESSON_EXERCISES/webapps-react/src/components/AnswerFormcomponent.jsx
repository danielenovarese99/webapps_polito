import { useState } from "react";
import Answer from "../Answers";
import { Form, Button } from "react-bootstrap";

function AnswerForm(props) {


    // define input field states and insert them as values in all input fields
    // + onChange event on each of the form.control elements
    const questionID = props.respAnswer ? props.respAnswer.questionID : 1;
    const [id, setId] = useState(props.respAnswer ? props.respAnswer.id : '');
    const [response, setResponse] = useState(props.respAnswer ? props.respAnswer.response : '');
    const [responseAuthor, setResponseAuthor] = useState(props.respAnswer ? props.respAnswer.respName : '');
    const [responseDate, setResponseDate] = useState(props.respAnswer ? props.respAnswer.date : '');

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log("submit request has been sent!\n");
        //console.log(responseDate);
        if (props.respAnswer) {
            const answer = new Answer(props.respAnswer.id, response, responseAuthor, responseDate,questionID);
            props.updateAnswer(answer);
        }
        else {
            const newAnswer = new Answer(props.lastId + 1, response, responseAuthor, responseDate,questionID, 0);
            props.addAnswer(newAnswer);

        }

    }

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Response</Form.Label>
                    <Form.Control type="text" placeholder="Response" minLength={2} maxLength={10} required={true} value={response} onChange={(event) => setResponse(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Author" required={true} value={responseAuthor} onChange={(event) => setResponseAuthor(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" placeholder="Date" required={true} value={responseDate} onChange={(event) => setResponseDate(event.target.value)} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={handleSubmit}>Add answer</Button>
                <Button onClick={props.showForm}>Cancel</Button>
            </Form>
        </>
    )
}
export default AnswerForm;