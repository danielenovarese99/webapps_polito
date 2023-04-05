import { Table, Col} from "react-bootstrap";
import AnswerRow from "./AnswerRowcomponent";

function AnswerTable(props) {
    let count = 0;
    return (
        <>
                <Table>
                    <thead>
                        <tr>
                            <th>Response</th>
                            <th>Author</th>
                            <th>Score</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.answers.map(element =>
                                <AnswerRow answer={element} key={count++}></AnswerRow>
                            )
                        }
                    </tbody>
                </Table>        
        </>
    )
}
export default AnswerTable;