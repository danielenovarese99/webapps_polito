import { Row, Col, Button } from 'react-bootstrap';
import AnswerTable from './AnswerTablecomponent';
import AnswerForm from './AnswerFormcomponent';
import { useState } from 'react';

function Answers(props) {
    const [showForm, setShowForm] = useState(false);

    /// updating the showForm state is just a toggle of its own value
    const updateForm = () => {
        setShowForm(showForm => {
            return !showForm;
        })
    }
    return (
        <>
            <h2 style={{ paddingLeft: '2em' }}>Received answers:</h2>
            <Row id="tablecomponent">
                <AnswerTable answers={props.answers} voteUp={props.voteUp} />
            </Row>
            {
            /* We assume that the last item in the answers has the biggest id
            
            
            We can also pass multiple functions as props >>>> addAnswer first calls props.addAnswer and then calls setShowForm() to update the state.
            */}

            {showForm ?
                <AnswerForm lastId={props.answers.slice(-1)[0].id} addAnswer={(answer) => { props.addAnswer(answer); setShowForm(); }} showForm={updateForm} />
                : <Button onClick={updateForm}>Add answer</Button>
            }
        </>
    )
}

export default Answers;