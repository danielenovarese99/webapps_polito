import { Form } from 'react-bootstrap'
import { useState } from 'react';
import {Col} from 'react-bootstrap';
function TEXTINPUTcomp(props) {


    const [value, setValue] = useState(props.placeholder);


    return (
        <>
            <Col>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder={props.placeholder}
                        className="me-2"
                        aria-label="Search"
                        onChange={(event) => { setValue(event.target.value); props.action(event.target.value) }}
                        value={value}
                    />
                </Form>
            </Col>
        </>
    )
}
export default TEXTINPUTcomp;