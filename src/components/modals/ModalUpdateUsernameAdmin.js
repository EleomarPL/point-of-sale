import { Modal } from 'bootstrap';
import { useState } from 'react';

import { notifyWarning } from '../../consts/notifications';
import ButtonPersonalized from '../common/ButtonPersonalized';

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

  const handleUpdateUsername = () => {
    if (password && username) {
      if (username.length < 6 || username > 50) {
        notifyWarning('Nuevo usuario debe tener de 6 a 50 caracteres');
      } else {
        console.log('passed');
      }
    } else {
      notifyWarning('Rellene todos los campos');
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
            >
              <ButtonPersonalized classNameIcon="bi bi-check-circle-fill" isColumn={ true }>
                Actualizar Usuario
              </ButtonPersonalized>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ModalUpdateUsernameAdmin;