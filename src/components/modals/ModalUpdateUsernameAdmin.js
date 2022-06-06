import { Modal } from 'bootstrap';
import { useContext, useState } from 'react';

import ButtonPersonalized from '../common/ButtonPersonalized';
import useAdmin from '../../hooks/useAdmin';
import Auth from '../../contexts/Auth';
import SpinnerButtonLoading from '../common/SpinnerButtonLoading';
import useValidationAdmin from '../../hooks/validations/useValidationAdmin';

export const openmodalUpdateUsernameAdmin = () => {
  let myModal = new Modal(
    document.getElementById('modalUpdateUsernameAdmin'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalUpdateUsernameAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { updateUsernameAdmin } = useAdmin();
  const { validateUsername } = useValidationAdmin();
  const { userData } = useContext(Auth);

  const handleUpdateUsername = () => {
    if (validateUsername({password, username})) {
      setIsLoading(true);
      updateUsernameAdmin({id: userData.id, password, username}).then(response => {
        setIsLoading(false);
        let myModal = Modal.getInstance( document.getElementById('modalUpdateUsernameAdmin') );
        if (response) {
          setPassword('');
          setUsername('');
          myModal.hide();
        }
      });
    }
  };

  return (
    <div className="modal fade" id="modalUpdateUsernameAdmin"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalUpdateUsernameAdminLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={ {backgroundColor: '#bed7aa'} }>
          <div className="modal-header">
            <h5 className="modal-title m-auto" id="modalUpdateUsernameAdminLabel">
              Cambiar Usuario
            </h5>
          </div>
          <div className="modal-body">
            <table className="w-100">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="new-username">Nuevo Usuario: </label>
                  </td>
                  <td>
                    <input type="text"
                      id="new-username" className="form-control mb-2"
                      value={ username } onChange={ (evt) => setUsername(evt.target.value) }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="password">Contraseña </label>
                  </td>
                  <td>
                    <input type="password"
                      id="password" className="form-control mb-2"
                      value={ password } onChange={ (evt) => setPassword(evt.target.value) }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer d-flex justify-content-evenly">
            <button type="button" className="button-btn-modals"
              data-bs-dismiss="modal"
            >
              <ButtonPersonalized classNameIcon="bi bi-x-circle-fill" isColumn={ true }>
                Salir
              </ButtonPersonalized>
            </button>
            <button type="button" className="button-btn-modals"
              onClick={ handleUpdateUsername }
              disabled={ isLoading }
            >
              <ButtonPersonalized classNameIcon="bi bi-check-circle-fill" isColumn={ true }>
                <span>
                  { isLoading &&
                    <SpinnerButtonLoading />
                  }
                  Actualizar Usuario
                </span>
              </ButtonPersonalized>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ModalUpdateUsernameAdmin;