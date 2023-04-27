import { AiFillEdit } from 'react-icons/ai'
import {Button} from 'react-bootstrap'
function MOVIELISTROWcomp(props) {
    const buttonstyle = {
        backgroundColor: 'transparent',
        border: '0px solid transparent',
        fontSize: '1em',
    };

    
    let mydate;
    if (props.item.date == undefined) {
        mydate = "Not available";
    }
    else {
        mydate = props.item.date.getDate() + "/" + props.item.date.getMonth() + "/" + props.item.date.getFullYear();
    }
    return (
        <>
            <tr>
                <td>{props.item.id}</td>
                <td>{props.item.title}</td>
                <td>{mydate}</td>
                <td>{props.item.favorite ? "True" : "False"}</td>
                <td>{props.item.rating}</td>
                <td><Button type="button" style={buttonstyle} onClick={() => {props.openForm(true);props.modifyAnswer(props.item);}}><AiFillEdit /></Button></td>
            </tr>
        </>
    )
}
export default MOVIELISTROWcomp;