import './ModalPseudo.scss';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

const ModalPseudo = ({onClose}) => {
  const {value1} = useContext(UserContext);
  const [details, setDetails] = value1;

  const PseudoChange = async (e) => {
    e.preventDefault();
    const newPseudo = e.target[0].value;
     console.log(newPseudo);
    await axios.patch(`http://localhost:3000/api/users/${details.id}`, {Pseudo : newPseudo});
    setDetails((prevDetails) => ({...prevDetails, Pseudo : newPseudo}))
    onClose();
  }


    return (
    
    <div className="modal">
                <div className="modal__content">
                    <h2 className="modal__title">Change your Pseudo</h2>
                    <form action="submit" onSubmit={(e) => {PseudoChange(e)}}>
                    <input className="modal__input" type="text" placeholder="New Pseudo"/>
                    <button className="modal__button" >Save</button>
                    <button className="modal__button" onClick={onClose}>X</button>
                    </form>
                </div>
            </div>
  );
}
export default ModalPseudo;