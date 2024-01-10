import './ModalPlatform.scss'

const ModalPlatform = () => {

    return(
        <fieldset>
            <legend>Choose your platform</legend>

            <div>
                <input type="checkbox" id="platform.name" name="platform.name" checked />
                <label for="platform.name">Platform.name</label>
            </div>
            
            <button onClick="">X</button>
        </fieldset>
    )
}

export default ModalPlatform