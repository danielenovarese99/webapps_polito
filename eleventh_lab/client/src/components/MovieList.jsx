import { Row, Table, Col, Button } from 'react-bootstrap';
import FilterList from './FilterList';
import MovieListRow from './MovieListRow';
import MovieForm from './MovieForm';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import APIURL from '../main';
import Film from '../../classes/Film';
import loginContext from '../../classes/loginContext';
function MovieList(props) {

    //let MovieManagement = useContext(Movies);
    const params = useParams();
    const logged_in = useContext(loginContext);

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState(params.filter);
    const [showForm, setShowForm] = useState(false);

    const [movieCount, setMovieCount] = useState(0);
    console.log(movieCount);

    const updateFilter = (newFilter) => {
        console.log("updating filter with " + newFilter);
        setFilter(newFilter);
    }


    /*
    // CANNOT USE USEFFECT TO UPDATE MOVIES.LENGTH AND REFRESH PAGE, AS THE FETCH() CALL IN THE STARTING RENDERING UPDATES MOVIECOUNT ITSELF >> INFINITE LOOP
    useEffect(() => {
        setMovieCount(movies.length + 1);
        console.log("Updating movie count > .." + movieCount);
    }, [movies.length]); // update the latest movie id with the last one available, everytimme the amount of movies in the APP changes
    */

    useEffect(() => {
        async function fetchMovies() {
            let response;
            if (filter === 'All' || filter === 'Favorites' || filter === 'Best Rated' || filter === 'Unseen') {
                switch (filter) {
                    case 'All':
                        response = await fetch(APIURL + 'films', { credentials: 'include' });
                        break;
                    case 'Favorites':
                        response = await fetch(APIURL + 'films?filter=favorites', { credentials: 'include' });
                        break;
                    case 'Best Rated':
                        response = await fetch(APIURL + 'films?filter=best-rated', { credentials: 'include' });
                        break;
                    case 'Unseen':
                        response = await fetch(APIURL + 'films?filter=unseen', { credentials: 'include' });
                        break;
                }
            } else {
                response = await fetch(APIURL + 'films', { credentials: 'include' });
            }
            const final_movie_list = await response.json(response);
            const final_result = final_movie_list.movies.filter(e => e.userid === logged_in.loginstate.userid);
            //console.log(final_movie_list);
            setMovies(final_result);
            setMovieCount(final_result[final_result.length - 1].id);
            setLoading(false); // update screen, movies have been loaded.
            //console.log(final_movie_list);
        }
        if (logged_in.loginstate.authorized === true) {
            fetchMovies();
        }
    }, [filter, logged_in.loginstate.authorized]);


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


    /// UPDATE MOVIES FUNCTIONALITIES
    let modifymovies = (newMovie) => {
        setMovies(movies => {
            return movies.map(element => {
                if (element.id == newMovie.id) {
                    return new Film(element.id, newMovie.title, newMovie.date, newMovie.favorite, newMovie.rating);
                }
                else {
                    return element;
                }
            })
        })
        //})
    }

    let deleteMovie = (movieID) => {
        setMovies(movies => { return movies.filter(element => element.id != movieID) });
    }

    let addMovie = (newMovie) => {
        setMovies(movies => {
            let currentMovies = [];
            movies.forEach(e => currentMovies.push(e));
            currentMovies.push(newMovie);
            return currentMovies;
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
                <FilterList filters={Filters} updateFilterAction={updateFilter} currentFilter={filter} />
                <Col>
                    {logged_in.loginstate.authorized === true ?
                        loading ?
                            <h1>Loading movie list...</h1>
                            :
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
                                        movies.map(element =>
                                            <MovieListRow key={element.id} item={element} />

                                        )
                                    }
                                </tbody>
                            </Table>
                        : <h1 style={{ textDecoration: 'underline' }}>You need to login</h1>
                    }
                    <p style={{ fontSize: '2em' }}>Viewing {filter}</p>
                    {
                        showForm === true ?
                            <MovieForm addMovie={addMovie} cancel={setShowForm} currentCount={movieCount} />
                            : <Button onClick={() => setShowForm(true)} type='button' style={buttonStyle}>Add movie</Button>
                    }
                </Col>
            </Row >
        </>
    )
}

export default MovieList;