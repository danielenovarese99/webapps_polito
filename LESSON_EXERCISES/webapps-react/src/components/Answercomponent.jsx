import { Row, Col } from 'react-bootstrap';
import AnswerTable from './AnswerTablecomponent';

function Answers(props) {
    return (
        <>
            <h2 style={{ paddingLeft: '2em' }}>Received answers:</h2>
            <Row id="tablecomponent">
                <AnswerTable answers={props.answers} />
            </Row>
        </>
    )
}

export default Answers;