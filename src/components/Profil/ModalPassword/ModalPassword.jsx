import './ModalPassword.scss';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import close from '../../../assets/close.svg';

const ModalPassword = ({onClose}) => {
  const {value1} = useContext(UserContext);
  const [details, setDetails] = value1;

  const PasswordChange = async (e) => {
    e.preventDefault();
    const newPassword = e.target[0].value;

    await axios.patch(`https://game-den-back.onrender.com/api/users/${details.id}`, {Password : newPassword});
    onClose();
  }


    return (
    
    <div className="modal">
                <div className="modal__content">
                <button className="modal__close-button" onClick={onClose}><img className="modal__close-img" src={close} alt="close" /></button>

                    <h2 className="modal__title">Change your Password</h2>
                    <form className="modal__form" action="submit" onSubmit={(e) => {PasswordChange(e)}}>
                    <input className="modal__input" type="text" placeholder="New Password"/>
                    <button className="modal__button" >Save</button>
                    </form>
                </div>
            </div>
  );
}
export default ModalPassword;