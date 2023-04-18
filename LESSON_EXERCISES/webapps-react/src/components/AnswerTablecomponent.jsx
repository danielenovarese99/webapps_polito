import { Table, Col, Button } from "react-bootstrap";
import AnswerRow from "./AnswerRowcomponent";
import { useState } from 'react';
import AnswerForm from './AnswerFormcomponent';
function AnswerTable(props) {
    let count = 0;
    let copySortedAnswers = [...props.answers];

    const [showForm, setShowForm] = useState(false);
    /// updating the showForm state is just a toggle of its own value
    const updateForm = () => {
        setShowForm(showForm => {
            return !showForm;
        })
    }


    const [editableAnswer, seteditableAnswer] = useState();
    const updateEditableAnswer = (answer) => {
        seteditableAnswer(oldanswer => {
            return answer;
        })
    }

    /// this is incase the button is inside of the table itself - and is contained in the same component as the data itself
    /// if the button was outside, it's actually easier and better to just pass the copied array.
    let [sortAscending, setSortAscending] = useState(true);


    if (sortAscending == true) {
        copySortedAnswers.sort((e1, e2) => e1.score - e2.score);
    }
    else {
        copySortedAnswers.sort((e1, e2) => e2.score - e1.score);
    }


    const sortByScore = () => {
        setSortAscending(sortAscending => {
            return !sortAscending;
        })
    }


    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Response</th>
                        <th>Author</th>
                        <th><a onClick={sortByScore}>Score</a></th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        copySortedAnswers.map(element =>
                            <AnswerRow answer={element} key={count++} voteUp={props.voteUp} id={element.id} showForm={updateForm} seteditableAnswer={seteditableAnswer}></AnswerRow>
                        )
                    }
                </tbody>
            </Table>
            {
            /* We assume that the last item in the answers has the biggest id
            We can also pass multiple functions as props >>>> addAnswer first calls props.addAnswer and then calls setShowForm() to update the state.
            */}
            {showForm ?
                <AnswerForm key={editableAnswer ? editableAnswer.id : -1} lastId={props.lastId} addAnswer={(answer) => { props.addAnswer(answer); setShowForm(); }} showForm={updateForm} respAnswer={editableAnswer} updateAnswer={(answer) =>{props.updateAnswer(answer); setShowForm();}}/>
                : <Button onClick={updateForm}>Add answer</Button>
                /// keys are used to let react know that something has changed - this will cause react to
                /// FORCE the re-rendering of a component.
            }
        </>
    )
}
export default AnswerTable;