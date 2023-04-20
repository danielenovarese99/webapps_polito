import { Row, Table, Col } from 'react-bootstrap';
import FilterList from './FilterListcomponent';
import MOVIELISTROWcomp from './MOVIELISTROWcomponent';
import { useState } from 'react';

function MovieBody(props) {

    let myobj = { filter: 0, movies: [...props.movielib] };
    const Filters = [
        { name: 'All', value: 0 },
        { name: 'Favorites', value: 1 },
        { name: 'Best Rated', value: 2 },
        { name: 'Seen Last month', value: 3 },
        { name: 'Unseen', value: 4 },
    ];
    /// STATE >> CONTAINS MOVIES & FILTER
    let [mymovies, setMyMovies] = useState(myobj);

    /// SET STATE
    const updateFilter = (newfilter) => {
        setMyMovies(mymovies => {
            let newmovies;

            /// ALL MOVIES
            if (newfilter == 0) {
                return { filter: newfilter, movies: [...props.movielib] };
            }
            /// FAVORITES
            else if (newfilter == 1) {
                newmovies = [...props.movielib].filter(element => element.favorite === true);
                return { filter: newfilter, movies: newmovies };
            }
            /// BEST RATED
            else if (newfilter == 2) {
                newmovies = [...props.movielib].filter(element => element.rating === 5);
                return { filter: newfilter, movies: newmovies };
            }
            /// SEEN LAST MONTH
            else if (newfilter == 3) {
                newmovies = [...props.movielib].filter(element => {
                    let currentDate = new Date();
                    if(element.date instanceof Date){
                        if(element.date.getMonth() == currentDate.getMonth())
                        {
                            return element;
                        }
                    }
                });
                return { filter: newfilter, movies: newmovies };
            }
            /// NEVER SEEN
            else if (newfilter == 4) {
                newmovies = [...props.movielib].filter(element => {
                    if((!(element.date instanceof Date))){
                        return element;
                    }
                });
                return { filter: newfilter, movies: newmovies };
            }
        })
    }
    const rowStyle = { display: 'flex', justifyContent: 'start', padding: '2em'};

    return (
        <>
            <Row style={rowStyle}>
                <FilterList filters={Filters} updateFilterAction={updateFilter} />
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Favorite</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mymovies.movies.map(element =>
                                    <MOVIELISTROWcomp key={element.id} item={element}></MOVIELISTROWcomp>
                                )
                            }
                        </tbody>
                    </Table>
                    <p style={{fontSize:'2em'}}>Viewing {Filters[mymovies.filter].name}</p>
                </Col>
            </Row>
        </>
    )
}

export default MovieBody;