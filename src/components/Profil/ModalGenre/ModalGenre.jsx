import './ModalGenre.scss'

const ModalGenre = () => {

    return(
        <fieldset>
            <legend>Choose your genre</legend>

            <div>
                <input type="checkbox" id="genre.name" name="genre.name" checked />
                <label for="genre.name">genre.name</label>
            </div>
            
            <button onClick="">X</button>
        </fieldset>
    )
}

export default ModalGenre