import { useEffect, useState } from 'react';
import { Modal } from 'bootstrap';
import PropTypes from 'prop-types';

import { inputEmployees } from '../../data/admin/modalEmployee';
import ButtonPersonalized from '../common/ButtonPersonalized';
import SpinnerButtonLoading from '../common/SpinnerButtonLoading';
import useEmployee from '../../hooks/useEmployee';
import useValidationEmployee from '../../hooks/validations/useValidationEmployee';
import { notifySuccess, notifyWarning } from '../../consts/notifications';

export const openmodalCreateEditEmployee = () => {
  let myModal = new Modal(
    document.getElementById('modalCreateEditEmployee'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalCreateEditEmployee = ({isCreateEmployee, dataEmployee, setDataSelected}) => {
  const [radio1, setRadio1] = useState(true);
  const [valueUser, setValueUser] = useState({
    code: '', name: '', lastName: '', motherLastName: '',
    user: '', password: '', gender: 'M', age: 18
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { validateCreationEmployee, validateUpdateEmployee } = useValidationEmployee();
  const {insertEmployee, updateEmployee} = useEmployee();

  useEffect(() => {
    if (!isCreateEmployee) {
      setValueUser({
        ...dataEmployee,
        user: dataEmployee.username, password: ''
      });
      setRadio1(dataEmployee.gender === 'M');
    } else
      setValueUser({
        code: '', name: '', lastName: '', motherLastName: '',
        user: '', password: '', gender: 'M', age: 18
      });
  }, [isCreateEmployee, dataEmployee]);
  useEffect(() => {
    // Wait for the result of inserting employee
    window.electron.on('render:insert-employee', (err, data) => {
      setIsLoading(false);
      if (!err) {
        console.log('error insert employee');
        return null;
      }
      if (data) {
        let myModal = Modal.getInstance( document.getElementById('modalCreateEditEmployee') );
        notifySuccess('Empleado agregado correctamente');
        setDataSelected({});
        window.electron.send('main:get-employees', {value: '', limit: 50});
        myModal.hide();
      } else {
        notifyWarning('Ingrese un diferente nombre de usuario');
      }
    });
    // Wait for the result of updating employee
    window.electron.on('render:update-employee', (err, data) => {
      setIsLoading(false);
      if (!err) {
        console.log('error update employee');
        return null;
      }
      if (data) {
        let myModal = Modal.getInstance( document.getElementById('modalCreateEditEmployee') );
        notifySuccess('Empleado actualizado correctamente');
        setDataSelected({});
        window.electron.send('main:get-employees', {value: '', limit: 50});
        myModal.hide();
      } else {
        notifyWarning('Ingrese un diferente nombre de usuario');
      }
    });
    // Delete previous events
    return () => {
      window.electron.removeAllListeners('render:insert-employee');
      window.electron.removeAllListeners('render:update-employee');
    };
  }, []);

  const handleSubmitEmployee = (evt) => {
    evt.preventDefault();
    if (isCreateEmployee) {
      if (validateCreationEmployee({event: evt})) {
        setIsLoading(true);
        insertEmployee({
          name: evt.target[0].value, lastName: evt.target[1].value,
          motherLastName: evt.target[2].value, age: evt.target[7].value,
          username: evt.target[3].value, password: evt.target[4].value,
          isAMan: evt.target[5].checked
        });
      }
    } else {
      if (validateUpdateEmployee({event: evt, itWillPasswordChange: showPassword})) {
        setIsLoading(true);
        updateEmployee({
          id: dataEmployee.code, age: showPassword ? evt.target[8].value : evt.target[7].value,
          username: evt.target[4].value,
          password: showPassword ? evt.target[5].value : ''
        });
      }
    }
  };

  return (
    <div className="modal fade" id="modalCreateEditEmployee"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalCreateEditEmployeeLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={ {backgroundColor: '#bed7aa'} }>
          <div className="modal-header">
            <h5 className="modal-title m-auto" id="modalCreateEditEmployeeLabel">
              { isCreateEmployee ? 'Agregar Empleado' : 'Editar Empleado' }
            </h5>
          </div>
          <div className="modal-body">
            <form onSubmit={ handleSubmitEmployee } id="form-employee">
              { !isCreateEmployee &&
                <div className="d-flex justify-content-center align-items-center mb-2">
                  <input className="form-check-input" type="checkbox"
                    value={ showPassword } id="showChangePassword"
                    style={ {marginRight: '0.5rem'} }
                    onClick={ () => setShowPassword(!showPassword) }
                  />
                  <label htmlFor="showChangePassword">Cambiar contraseña</label>
                </div>
              }
              <table className="w-100">
                <tbody>
                  { inputEmployees &&
                    inputEmployees.map(employee => {
                      if (employee.id !== 'password' || isCreateEmployee)
                        return <tr key={ employee.id } >
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
                        </tr>;
                      else
                        return <tr key={ employee.id }>
                          { showPassword &&
                            <>
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
                            </>
                          }
                        </tr>;
                    }
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
              data-bs-dismiss="modal" onClick={ () => {
                setDataSelected({});
              } }
            >
              <ButtonPersonalized classNameIcon="bi bi-x-circle-fill" isColumn={ true }>
                Salir
              </ButtonPersonalized>
            </button>
            <button type="submit" className="button-btn-modals"
              form="form-employee" disabled={ isLoading }
            >
              <ButtonPersonalized classNameIcon="bi bi-check-circle-fill" isColumn={ true }>
                <span>
                  { isLoading &&
                    <SpinnerButtonLoading />
                  }
                  { isCreateEmployee ? 'Agregar Empleado' : 'Editar Empleado' }
                </span>
              </ButtonPersonalized>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalCreateEditEmployee.propTypes = {
  isCreateEmployee: PropTypes.bool.isRequired,
  dataEmployee: PropTypes.object.isRequired,
  setDataSelected: PropTypes.func.isRequired
};

export default ModalCreateEditEmployee;