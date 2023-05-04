import { AiFillEdit } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import { GiConfirmed } from 'react-icons/gi'
import { Button } from 'react-bootstrap'
import Movies from '../Movies';
import { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Film from '../classes/Film';

function MovieListRow(props) {

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
                                // update movie
                                MovieManagement.updatefunction(new Film(props.item.id, formTitle, formDate, formFavorite, formRating));
                            }}><GiConfirmed /></Button>
                            <Button type="button" style={buttonstyle} onClick={(event) => MovieManagement.removefunction(props.item.id)}><BsFillTrashFill /></Button>
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
                            <Button type="button" style={buttonstyle} onClick={(event) => MovieManagement.removefunction(props.item.id)}><BsFillTrashFill /></Button>
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