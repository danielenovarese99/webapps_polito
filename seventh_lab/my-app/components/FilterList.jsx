import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function FilterList(props) {
    const navigate = useNavigate();
    const buttonStyle = {
        display: 'block',
        backgroundColor: 'Cadetblue',
        color: 'white',
        margin:'0.5rem'
    }

    return (
        <>
            <Col>
            {
                props.filters.map(element => 
                    <Button style={buttonStyle} key={element.value} onClick={(event) => navigate('../Movies/'+element.name)} value={element.value}>{element.name}</Button>
                )
            }
            </Col>
        </>
    )
}
export default FilterList;
//<Button onClick={(event) => props.updateFilterAction(event.target.value)} value={element.value}>{element.name}</Button>