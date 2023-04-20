function MOVIELISTROWcomp(props) {
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
            </tr>
        </>
    )
}
export default MOVIELISTROWcomp;