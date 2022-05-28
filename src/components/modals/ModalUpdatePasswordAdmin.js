import { Modal } from 'bootstrap';
import { useState } from 'react';

import { notifyWarning } from '../../consts/notifications';
import ButtonPersonalized from '../common/ButtonPersonalized';
import useAdmin from '../../hooks/useAdmin';
import Auth from '../../contexts/Auth';
import SpinnerButtonLoading from '../common/SpinnerButtonLoading';
import { useContext } from 'react';

export const openmodalUpdatePasswordAdmin = () => {
  let myModal = new Modal(
    document.getElementById('modalUpdatePasswordAdmin'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalUpdatePasswordAdmin = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {updatePasswordAdmin} = useAdmin();
  const {userData} = useContext(Auth);

  const handleUpdatePassword = () => {
    if (newPassword !== confirmNewPassword) {
      notifyWarning('Las contraseñas no coinciden');
    } else {
      if (confirmNewPassword.length < 6 || confirmNewPassword.length > 50) {
        notifyWarning('Nueva contraseña debe tener de 6 a 50 caracteres');
      } else {
        setIsLoading(true);
        updatePasswordAdmin({
          id: userData.id, oldPassword: currentPassword, newPassword
        }).then(response => {
          setIsLoading(false);
          setNewPassword('');
          setConfirmNewPassword('');
          if (response) {
            let myModal = Modal.getInstance( document.getElementById('modalUpdatePasswordAdmin') );
            myModal.hide();
          }
        });
      }
    }
  };

  return (
    <div className="modal fade" id="modalUpdatePasswordAdmin"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalUpdatePasswordAdminLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={ {backgroundColor: '#bed7aa'} }>
          <div className="modal-header">
            <h5 className="modal-title m-auto" id="modalUpdatePasswordAdminLabel">
              Cambiar Usuario
            </h5>
          </div>
          <div className="modal-body">
            <table className="w-100">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="current-password">Contraseña Actual: </label>
                  </td>
                  <td>
                    <input type="password"
                      id="current-password" className="form-control mb-2"
                      value={ currentPassword } onChange={ (evt) => setCurrentPassword(evt.target.value) }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="new-password">Nueva Contraseña: </label>
                  </td>
                  <td>
                    <input type="password"
                      id="new-password" className="form-control mb-2"
                      value={ newPassword } onChange={ (evt) => setNewPassword(evt.target.value) }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="confirm-new-password">Confirmar Nueva Contraseña: </label>
                  </td>
                  <td>
                    <input type="password"
                      id="confirm-new-password" className="form-control mb-2"
                      value={ confirmNewPassword }
                      onChange={ (evt) => setConfirmNewPassword(evt.target.value) }
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
              onClick={ handleUpdatePassword }
              disabled={
                newPassword !== confirmNewPassword || newPassword === ''
                || confirmNewPassword === '' || currentPassword === '' || isLoading
              }
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


export default ModalUpdatePasswordAdmin;