import './ModalEmail.scss';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

const ModalEmail = ({onClose}) => {
  const {value1} = useContext(UserContext);
  const [details, setDetails] = value1;

  const EmailChange = async (e) => {
    e.preventDefault();
    const newEmail = e.target[0].value;
     console.log(newEmail);
    await axios.patch(`http://localhost:3000/api/users/${details.id}`, {Email : newEmail});
    setDetails((prevDetails) => ({...prevDetails, Email : newEmail}))
    onClose();
  };

  return (
    <div className="modal">
                <div className="modal__content">
                    <h2 className="modal__title">Change your email</h2>
                    <form action="submit" onSubmit={(e) => {EmailChange(e)}}>
                    <input className="modal__input" type="text" placeholder="New email"/>
                    <button className="modal__button" >Save</button>
                    <button className="modal__button" onClick={onClose}>X</button>
                    </form>
                </div>
            </div>
  );
};

export default ModalEmail;
