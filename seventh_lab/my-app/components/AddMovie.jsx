import MovieForm from "./MovieForm";

function AddMovie(props) {
    return (
        <>
            <h1>Add movie</h1>
            <MovieForm addOnly={true}/>
        </>
    )
}
export default AddMovie;