import { Navbar, Container, Row, Col } from 'react-bootstrap';
import TitleComp from './MyTitle';
import TEXTINPUTcomp from './TextInput';
import { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';

function MyNavBar(props) {
    const [navbarstate, setNavbarstate] = useState('');

    const searchField = (text) => { //// this is for search bar, to update later
        setNavbarstate(navbarstate => { return text });
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

    return (
        <>
            <Navbar expand="lg" variant="light" bg="dark" style={mystyle}>
                <Container>
                    <Row style={rowStyle}>
                        <TitleComp title="Daniele's library" />
                        <TEXTINPUTcomp placeholder="Search movie" action={searchField} />
                        <Col><FaUserAlt size={25} /></Col>
                    </Row>
                    <h3><Link to="Movies/All">Home</Link></h3>
                    <h3><Link to="AddMovie">Add movie</Link></h3>                  
                </Container>
            </Navbar>
        </>
    )
}

export default MyNavBar;