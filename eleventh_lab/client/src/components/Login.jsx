import { useState } from "react";
import { Row, Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
function Login(props) {

    const navigate = useNavigate();

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [invalidPsw, setInvalidPsw] = useState(false);
    let [invalidEmail, setInvalidEmail] = useState(false);

    const submitForm = (event) => {
        event.preventDefault();

        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email == undefined || email == "" || email_regex.test(email) !== true) {
            setInvalidEmail(true);
            return;
        }

        if (password == undefined || password == "" || password == " ") {
            setInvalidPsw(true);
            return;
        }

        props.loginaction(email, password);
        navigate('../Movies/All');

        // try fetch request to server 
        // POST REQUEST >> body email + password
        // check response - if valid, redirect to homepage
        // check data validity
    }

    const rowStyle = { display: 'flex', justifyContent: 'start', padding: '2em' };
    const buttonStyle = {
        display: 'block',
        backgroundColor: 'Cadetblue',
        color: 'white',
        margin: '0.5rem',
        fontSize: '1rem'
    }



    return (
        <>
            <Row style={rowStyle}>
            </Row>
            <h2>Insert your data below</h2>
            <Form style={{ fontSize: '1.2rem' }}>
                <Form.Group>
                    {invalidEmail ? <h3 style={{ color: 'red' }}> Invalid email</h3> : ""}
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="text" placeholder="email" required={true} value={email} onChange={(event) => setEmail(event.target.value)} />
            </Form.Group>
            <Form.Group>
                {invalidPsw ? <h3 style={{ color: 'red' }}>Invalid password</h3> : ""}
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" min={0} max={20} required={true} value={password} onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>
            <Button style={buttonStyle} type="submit" onClick={(event) => submitForm(event)}>Login</Button>
            <Button style={buttonStyle} type="button" onClick={() => console.log("forgot psw button click")}>Forgot password</Button>
        </Form >
        </>
    )
}

export default Login;