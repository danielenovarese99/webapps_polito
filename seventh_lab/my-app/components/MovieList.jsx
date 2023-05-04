import { Row, Table, Col, Button } from 'react-bootstrap';
import FilterList from './FilterList';
import MovieListRow from '../components/MovieListRow';
import MovieForm from './MovieForm';
import { useContext, useState } from 'react';
import Movies from '../Movies';
import { Link, useParams } from 'react-router-dom';
function MovieList(props) {

    let MovieManagement = useContext(Movies);
    const params = useParams();
    console.log(params.filter)

    let currentMovies = MovieManagement.movielist;

    switch (params.filter) {
        case 'All':
            currentMovies = [...MovieManagement.movielist];
            break;
        case 'Favorites':
            currentMovies = MovieManagement.movielist.filter(element => element.favorite === true);
            break;
        case 'Best Rated':
            currentMovies = MovieManagement.movielist.filter(element => element.rating == 5);
            break;
        case 'Seen Last month':
            currentMovies = MovieManagement.movielist.filter(element => {
                let currentDate = new Date();
                if (element.date instanceof Date) {
                    if (element.date.getMonth() == currentDate.getMonth()) {
                        return element;
                    }
                }
            });
            break;
        case 'Unseen':
            currentMovies = MovieManagement.movielist.filter(element => element.date === undefined);
            break;
        default:
            currentMovies = [...MovieManagement.movielist];
    }

    const Filters = [
        { name: 'All', value: 0 },
        { name: 'Favorites', value: 1 },
        { name: 'Best Rated', value: 2 },
        { name: 'Seen Last month', value: 3 },
        { name: 'Unseen', value: 4 },
    ];


    // MODIFY EXISTANT MOVIE
    let [modifiableAnswer, setModifiableAnswer] = useState();

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
                                currentMovies.map(element =>
                                    <MovieListRow key={element.id} item={element} modifyAnswer={updateanswer} />

                                )
                            }
                        </tbody>
                    </Table>
                    <p style={{ fontSize: '2em' }}>Viewing {Filters[props.filter].name}</p>
                    <Link to="../AddMovie">Add movie</Link>
                </Col>
            </Row >
        </>
    )
}

export default MovieList;