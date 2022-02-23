import { useEffect, useState } from 'react';
import { Modal } from 'bootstrap';

import {inputEmployees} from '../../data/admin/modalEmployee';
import ButtonPersonalized from '../common/ButtonPersonalized';
import SpinnerButtonLoading from '../common/SpinnerButtonLoading';
import { isObjectValuesNull, validateLength } from '../../services/validations/generalValidations';
import useAdmin from '../../hooks/useAdmin';
import { notifySuccess } from '../../consts/notifications';

export const openmodalCreateAdmin = () => {
  let myModal = new Modal(
    document.getElementById('modalCreateAdmin'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalCreateAdmin = () => {
  const [radio1, setRadio1] = useState(true);
  const [valueUser, setValueUser] = useState({
    code: '', name: '', lastName: '', motherLastName: '',
    user: '', password: '', gender: 'M', age: 18
  });
  const [isLoading, setIsLoading] = useState(false);
  const {insertAdmin} = useAdmin();
  useEffect(() => {
    // Wait for the result of inserting admin
    window.electron.on('render:insert-admin', (err, data) => {
      setIsLoading(false);
      if (!err) {
        console.log('error insert admin');
        return null;
      }
      let myModal = Modal.getInstance( document.getElementById('modalCreateAdmin') );
      if (data) {
        notifySuccess('Administrador agregado correctamente');
        window.electron.send('main:is-there-an-admin');
        myModal.hide();
      } else {
        notifySuccess('Error al crear administrador');
      }
    });
    // Delete previous events
    return () => {
      window.electron.removeAllListeners('render:insert-admin');
    };
  }, []);

  const handleSubmitEmployee = (evt) => {
    evt.preventDefault();

    let dataAdminForm = {
      name: {
        name: 'Nombre',
        minLength: 2,
        maxLength: 50,
        value: evt.target[0].value
      },
      lastName: {
        name: 'Apellido paterno',
        minLength: 2,
        maxLength: 50,
        value: evt.target[1].value
      },
      motherLastName: {
        name: 'Apellido materno',
        minLength: 2,
        maxLength: 50,
        value: evt.target[2].value
      },
      userName: {
        name: 'Usuario',
        minLength: 6,
        maxLength: 50,
        value: evt.target[3].value
      },
      password: {
        name: 'Contraseña',
        minLength: 6,
        maxLength: 50,
        value: evt.target[4].value
      }
    };
    
    if ( !isObjectValuesNull(dataAdminForm) && validateLength(dataAdminForm) ) {
      setIsLoading(true);
      insertAdmin({
        name: dataAdminForm.name.value, lastName: dataAdminForm.lastName.value,
        motherLastName: dataAdminForm.motherLastName.value,
        username: dataAdminForm.userName.value, password: dataAdminForm.password.value,
        age: evt.target[7].value, isAMan: evt.target[5].checked
      });
    }
  };

  return (
    <div className="modal fade" id="modalCreateAdmin"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalCreateAdminLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={ {backgroundColor: '#bed7aa'} }>
          <div className="modal-header">
            <h5 className="modal-title m-auto" id="modalCreateAdminLabel">
              Agregar Administrador
            </h5>
          </div>
          <div className="modal-body">
            <form onSubmit={ handleSubmitEmployee } id="form-create-admin">
              <table className="w-100">
                <tbody>
                  { inputEmployees &&
                    inputEmployees.map(employee =>
                      <tr key={ employee.id } >
                        <td>{ employee.placeholder }</td>
                        <td>
                          <input type={ employee.type } className="form-control mb-2"
                            placeholder={ employee.placeholder } aria-label={ employee.id.toUpperCase() }
                            aria-describedby={ employee.id }
                            style={ {backgroundColor: '#f6eded'} }
                            value={ valueUser[employee.id] || '' }
                            onChange={ (evt) => setValueUser({
                              ...valueUser,
                              [employee.id]: evt.target.value
                            }) }
                          />
                        </td>
                      </tr>
                    )
                  }
                  <tr>
                    <td>Sexo:</td>
                    <td>
                      <div className="form-check">
                        <input className="form-check-input" type="radio"
                          name="flexRadioDefault" id="flexRadioDefault1"
                          checked={ radio1 } onChange={ () => setRadio1(!radio1) }
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                          Masculino
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio"
                          name="flexRadioDefault" id="flexRadioDefault2"
                          checked={ !radio1 } onChange={ () => setRadio1(!radio1) }
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                          Femenino
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Edad</td>
                    <td>
                      <select className="form-select"
                        value={ valueUser.age || 18 } onChange={ (evt => setValueUser({
                          ...valueUser,
                          age: evt.target.value
                        })) }
                      >
                        {
                          Array(42).fill(0).map((_, i) =>
                            <option
                              key={ i }
                              value={ i + 18 }
                            >
                              { i + 18 }
                            </option>
                          )
                        }
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <div className="modal-footer d-flex justify-content-evenly">
            <button type="button" className="button-btn-modals"
              data-bs-dismiss="modal"
            >
              <ButtonPersonalized classNameIcon="bi bi-x-circle-fill" isColumn={ true }>
                Salir
              </ButtonPersonalized>
            </button>
            <button type="submit" className="button-btn-modals"
              form="form-create-admin" disabled={ isLoading }
            >
              <ButtonPersonalized classNameIcon="bi bi-check-circle-fill" isColumn={ true }>
                <span>
                  { isLoading &&
                    <SpinnerButtonLoading />
                  }
                  Agregar Administrador
                </span>
              </ButtonPersonalized>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateAdmin;