import { Table, Col } from "react-bootstrap";
import AnswerRow from "./AnswerRowcomponent";
import { useState } from 'react';

function AnswerTable(props) {
    let count = 0;
    let copySortedAnswers = [...props.answers];

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
        console.log("ciao");
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
                            <AnswerRow answer={element} key={count++} voteUp={props.voteUp} id={element.id}></AnswerRow>
                        )
                    }
                </tbody>
            </Table>
        </>
    )
}
export default AnswerTable;