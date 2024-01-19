import './ModalPassword.scss';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

const ModalPassword = ({onClose}) => {
  const {value1} = useContext(UserContext);
  const [details, setDetails] = value1;

  const PasswordChange = async (e) => {
    e.preventDefault();
    const newPassword = e.target[0].value;

    await axios.patch(`http://localhost:3000/api/users/${details.id}`, {Password : newPassword});
    onClose();
  }


    return (
    
    <div className="modal">
                <div className="modal__content">
                    <h2 className="modal__title">Change your Password</h2>
                    <form action="submit" onSubmit={(e) => {PasswordChange(e)}}>
                    <input className="modal__input" type="text" placeholder="New Password"/>
                    <button className="modal__button" >Save</button>
                    <button className="modal__button" onClick={onClose}>X</button>
                    </form>
                </div>
            </div>
  );
}
export default ModalPassword;