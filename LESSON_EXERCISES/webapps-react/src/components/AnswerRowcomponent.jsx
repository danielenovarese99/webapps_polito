function AnswerRow(props){
    return(
        <>
        <tr>
            <td>{props.answer.respName}</td>
            <td>{props.answer.response}</td>
            <td>{props.answer.score}</td>
            <td>{props.answer.date.getDay() + "/" + props.answer.date.getMonth() + "/" + props.answer.date.getFullYear()}</td>
            <td>TODO</td>
        </tr>
        </>
    )
}

export default AnswerRow;