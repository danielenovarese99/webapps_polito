import {Col} from 'react-bootstrap';
function TitleComp(props) {
    return (
        <>
            <Col >
                <h3 style={{ display: 'inline', paddingLeft: '0.5em' }}>{props.title}</h3>
            </Col>
        </>
    )
}

export default TitleComp;