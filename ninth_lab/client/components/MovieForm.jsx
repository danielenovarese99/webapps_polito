import { Row, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import Film from '../classes/Film';


function MovieForm(props) {




    let [formTitle, setFormTitle] = useState(props.currentAnswer ? props.currentAnswer.title : '');
    let [formDate, setFormDate] = useState(props.currentAnswer ? props.currentAnswer.date : '');
    let [formFavorite, setFormFavorite] = useState(props.currentAnswer ? props.currentAnswer.favorite : false);
    let [formRating, setFormRating] = useState(props.currentAnswer ? props.currentAnswer.rating : 0);


    const submitForm = (event) => {
        event.preventDefault();

        // form validation
        if (formTitle == '' || formTitle.length === 0) {
            alert("Invalid title");
            return;
        }
        if (formFavorite === undefined) {
            alert("Invalid favorite value");
            return;
        }

        let intFormRating = parseInt(formRating);
        if (typeof intFormRating != 'number' || intFormRating > 5 || intFormRating < 0) {
            alert("Invalid rating");
            //console.log(typeof intFormRating);
            return;
        }


        /// !!!!! CANCEL ACTION IS REALLY IMPORTANT AS IT REMOVES ANY CURRENT ANSWERS PRESENT IN THE FORM


        if (props.currentAnswer) {
            let newFilm = new Film(props.currentCount, formTitle, formDate, formFavorite, formRating);

            props.addMovie(newFilm);
            props.cancel(false);
            //props.cancelAction(false);
        }
        else {
            let newFilm = new Film(props.currentCount, formTitle, formDate, formFavorite, formRating);

            props.addMovie(newFilm);
            props.cancel(false);
        }
    }

    /// useless
    const cancelForm = (event) => {
        event.preventDefault();
        props.cancelAction(false);
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
                <Form style={{ fontSize: '1.2rem' }}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" minLength={2} maxLength={10} required={true} value={formTitle} onChange={(event) => setFormTitle(event.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" placeholder="Date" required={true} value={formDate} onChange={(event) => setFormDate(event.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Favorite</Form.Label>
                        <Form.Control type="checkbox" placeholder="Favorite" checked={formFavorite} required={true} value={formFavorite} onChange={(event) => setFormFavorite(event.target.checked)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" min={0} max={5} required={true} value={formRating} onChange={(event) => setFormRating(event.target.value)} />
                    </Form.Group>
                    <Button style={buttonStyle} type="button" onClick={submitForm}>Add answer</Button>
                    {props.addOnly == false ? <Button style={buttonStyle} onClick={cancelForm}>Cancel</Button> : ''}
                </Form>
            </Row>


        </>
    )
}
export default MovieForm;