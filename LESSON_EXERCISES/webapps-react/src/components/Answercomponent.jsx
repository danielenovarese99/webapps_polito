import { Row, Col } from 'react-bootstrap';
import AnswerTable from './AnswerTablecomponent';
import { useState } from 'react';
import AnswerForm from './AnswerFormcomponent';
import Answer from '../Answers';
function Answers(props) {
    return (
        <>
            <h2 style={{ paddingLeft: '2em' }}>Received answers:</h2>
            <Row id="tablecomponent">
                <AnswerTable answers={props.answers} voteUp={props.voteUp} />
            </Row>
            <AnswerForm />
        </>
    )
}

export default Answers;