import { Row, Col } from 'react-bootstrap';

function TopNavBar(props) {
    return (
        <>
            <Row id='topnavbarTitle'>
                <h1>{props.title}</h1>
            </Row>
        </>
    )
}
export default TopNavBar;