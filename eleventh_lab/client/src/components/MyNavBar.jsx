import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import TitleComp from './MyTitle';
import TEXTINPUTcomp from './TextInput';
import { useContext, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import loginContext from '../../classes/loginContext';
import { useNavigate } from 'react-router-dom';

function MyNavBar(props) {

    const navigate = useNavigate();
    const [navbarstate, setNavbarstate] = useState('');
    const logged_in = useContext(loginContext);

    const searchField = (text) => { //// this is for search bar, to update later
        setNavbarstate(navbarstate => { return text });
    }


    const logout = () => {
        props.logoutaction()
            .then((result) => {
                if (result === true) {
                    navigate("../Login");
                }
            })
            .catch(err => console.log(err));
    }

    const mystyle = {
        backgroundColor: 'Cadetblue',
        color: 'white',
        padding: '1.5em',
    }
    const rowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    const buttonStyle = {
        display: 'inline',
        backgroundColor: 'Crimson',
        color: 'white',
        margin: '0.5rem',
        fontSize: '1rem'
    }

    return (
        <>
            <Navbar expand="lg" variant="light" bg="dark" style={mystyle}>
                <Container>
                    <Row style={rowStyle}>
                        <TitleComp title="Daniele's library" />
                        <TEXTINPUTcomp placeholder="Search movie" action={searchField} />
                        {logged_in.loginstate.authorized === true ?
                            <Col><FaUserAlt size={25} /><Button style={buttonStyle} onClick={() => logout()}>Logout</Button></Col>
                            : <Col><FaUserAlt size={25} /><Button style={buttonStyle}><Link to="Login">LOGIN</Link></Button></Col>
                        }
                    </Row>
                    <h3><Link to="Movies/All">Home</Link></h3>
                    <h3><Link to="AddMovie">Add movie</Link></h3>
                </Container>
            </Navbar>
        </>
    )
}

export default MyNavBar;