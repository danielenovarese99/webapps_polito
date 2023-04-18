import { Button } from "react-bootstrap";
function AnswerRow(props) {
    return (
        <>
            <tr>
                <td>{props.answer.respName}</td>
                <td>{props.answer.response}</td>
                <td>{props.answer.score}</td>
                <td>{props.answer.date.getDay() + "/" + props.answer.date.getMonth() + "/" + props.answer.date.getFullYear()}</td>
                <td>
                    <Button type="button" onClick={() => {
                        props.voteUp(props.id);
                    }}>+</Button>
                    <Button type="button" onClick={() => {
                        {/*
                         Edit the current values
                         To do this, we will need to show the input form aswell
                        */}
                        props.showForm();
                        props.seteditableAnswer(props.answer);
                    }}>Edit</Button></td>
            </tr>
        </>
    )
}

export default AnswerRow;