import { AiFillEdit } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import { GiConfirmed } from 'react-icons/gi'
import { Button } from 'react-bootstrap'
import Movies from '../Movies';
import { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Film from '../classes/Film';
import { useNavigate } from 'react-router-dom';
import APIURL from '../src/main';
function MovieListRow(props) {

    const navigate = useNavigate();


    let mydate;
    if (props.item.date == undefined) {
        mydate = undefined;
    }
    else {
        mydate = props.item.date.getDate() + "/" + props.item.date.getMonth() + "/" + props.item.date.getFullYear();
    }


    let MovieManagement = useContext(Movies);

    /// MODIFY CURRENT MOVIE
    let [modifiable, setModifiable] = useState(false);
    let [formTitle, setFormTitle] = useState(props.item.title);
    let [formDate, setFormDate] = useState(mydate);
    let [formFavorite, setFormFavorite] = useState(props.item.favorite);
    let [formRating, setFormRating] = useState(props.item.rating);

    const buttonstyle = {
        backgroundColor: 'transparent',
        border: '0px solid transparent',
        fontSize: '1em',
    };

    const updateMovie = async () => {
        // props.item.id
        // everything else is in the state- verify their validity and send put request
        const my_request = await fetch(APIURL + 'films/' + props.item.id,{
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({title: formTitle, favorite: formFavorite == true ? 1 : 0, watchdate: formDate == undefined? 'undefined' : formDate, rating: formRating})
        });

        if(my_request.ok){
            if(my_request.headers.get('Content-Type') == 'application/json; charset=utf-8'){
                const my_response = await my_request.json();
                if(my_response.success === true && my_response.status === 200){
                    alert('Movie updated succesfully');
                    navigate(0);
                }
                else{
                    alert('Error updating movie');
                    navigate(0);
                }
            }
            else{
                alert('response content is not json');
            }
        }
        else{
            alert('request not ok');
        }
    }

    const deleteMovie = async () => {
        const my_request = await fetch(APIURL + 'films/'+ props.item.id,{
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        if(my_request.ok){
            if(my_request.headers.get('Content-Type') == 'application/json; charset=utf-8'){
                const my_response = await my_request.json();
                if(my_response.success === true && my_response.status === 200){
                    alert('Movie deleted succesfully');
                    navigate(0);
                }
                else{
                    alert('Error updating movie');
                    navigate(0);
                }
            }
            else{
                alert('response content is not json');
            }
        }
        else{
            alert('request not ok');
        }
    }


    return (
        <>
            {
                modifiable ?
                    /// MODIFYING CURRENT TABLE ROW
                    <tr>
                        <td>{props.item.id}</td>
                        <td style={{ color: props.item.favorite ? 'red' : 'black' }}>
                            <Form>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Title" minLength={2} maxLength={10} required={true} value={formTitle} onChange={(event) => setFormTitle(event.target.value)} />
                                </Form.Group>
                            </Form>

                        </td>
                        <td>
                            <Form>
                                <Form.Group>
                                    <Form.Control type="date" placeholder="Date" required={true} value={formDate} onChange={(event) => setFormDate(event.target.value)} />
                                </Form.Group>
                            </Form>
                        </td>
                        <td>
                            <Form>
                                <Form.Control type="checkbox" placeholder="Favorite" checked={formFavorite} onChange={(event) => { setFormFavorite(event.target.checked) }} />
                            </Form>
                        </td>
                        <td>
                            <Form>
                                <Form.Group>
                                    <Form.Control type="number" min={0} max={5} required={true} value={formRating} onChange={(event) => setFormRating(event.target.value)} />
                                </Form.Group>
                            </Form>
                        </td>
                        <td>
                            <Button type="button" style={buttonstyle} onClick={() => {
                                setModifiable(false);
                                updateMovie()
                                // update movie
                                //const new_Movie = new Film(props.item.id, formTitle, formDate, formFavorite, formRating);
                                //props.modifyMovie(new_Movie);
                            }}><GiConfirmed /></Button>
                            <Button type="button" style={buttonstyle} onClick={(event) => deleteMovie()}><BsFillTrashFill /></Button>
                        </td>
                    </tr>
                    :
                    //// NORMAL TABLE ROW
                    <tr>
                        <td>{props.item.id}</td>
                        <td style={{ color: props.item.favorite ? 'red' : 'black' }}>{props.item.title}</td>
                        <td>{mydate === undefined ? 'undefined' : mydate}</td>
                        <td>
                            <Form>
                                <Form.Control type="checkbox" placeholder="Favorite" checked={props.item.favorite} onChange={(event) => { MovieManagement.updatefunction(new Film(props.item.id, props.item.title, mydate, !props.item.favorite, props.item.rating)) }} />
                            </Form>
                        </td>
                        <td>{props.item.rating}</td>
                        <td>
                            <Button type="button" style={buttonstyle} onClick={() => { setModifiable(true) }}><AiFillEdit /></Button>
                            <Button type="button" style={buttonstyle} onClick={(event) =>  deleteMovie()}><BsFillTrashFill /></Button>
                        </td>
                    </tr>
            }
        </>
    )
}
export default MovieListRow;
/*
{props.item.favorite ? "True" : "False"}
*/