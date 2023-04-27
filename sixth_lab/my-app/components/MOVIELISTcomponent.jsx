import { Row, Table, Col, Button } from 'react-bootstrap';
import FilterList from './FilterListcomponent';
import MOVIELISTROWcomp from './MOVIELISTROWcomponent';
import MovieForm from './MOVIEFORMcomponent';
import { useState } from 'react';


function MovieBody(props) {


    const Filters = [
        { name: 'All', value: 0 },
        { name: 'Favorites', value: 1 },
        { name: 'Best Rated', value: 2 },
        { name: 'Seen Last month', value: 3 },
        { name: 'Unseen', value: 4 },
    ];
    /// STATE >> TOGGLE FORM 
    let [addMovie, setAddMovie] = useState(false);

    let closeMovie = () => {
        setAddMovie(false);
        setModifiableAnswer(modifiableAnswer => {
            return undefined;
        })
    }

    // MODIFY EXISTANT MOVIE
    let [modifiableAnswer,setModifiableAnswer] = useState();

    const updateanswer = (newAnswer) => {
        setModifiableAnswer(modifiableAnswer => {
            return newAnswer;
        })
    }

    
    const rowStyle = { display: 'flex', justifyContent: 'start', padding: '2em' };
    const buttonStyle = {
        display: 'block',
        backgroundColor: 'Crimson',
        color: 'white',
        margin: '0.5rem',
        fontSize: '1rem'
    }

    return (
        <>
            <Row style={rowStyle}>
                <FilterList filters={Filters} updateFilterAction={props.updatemovielist} currentFilter={props.filter} />
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Favorite</th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.movielib.map(element =>
                                    <MOVIELISTROWcomp key={element.id} item={element} modifyAnswer={updateanswer} openForm={setAddMovie}/>
                                )
                            }
                        </tbody>
                    </Table>
                    <p style={{ fontSize: '2em' }}>Viewing {Filters[props.filter].name}</p>
                    {addMovie == true ?
                        <MovieForm key={modifiableAnswer ? modifiableAnswer.id : -1} updatemovielist={props.updatemovielist} filter={props.filter} cancelAction={closeMovie} movieCount={props.movieCount} currentAnswer={modifiableAnswer} modifyMovie={props.modifyMovie}/>
                        : <Button type="button" style={buttonStyle} onClick={() => setAddMovie(true)}>Add movie</Button>
                    }
                </Col>
            </Row >
        </>
    )
}

export default MovieBody;