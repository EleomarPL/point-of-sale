import React, { useEffect, useState } from 'react';
import { Modal } from 'bootstrap';
import PropTypes from 'prop-types';

import {inputProvider} from '../../data/admin/modalProvider';
import ButtonPersonalized from '../common/ButtonPersonalized';

export const openmodalCreateEditProvider = () => {
  let myModal = new Modal(
    document.getElementById('modalCreateEditEmployee'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalCreateEditProvider = ({isCreateProvider, dataProvider, setDataSelected}) => {
  const [valueUser, setValueUser] = useState({
    code: '', company: '', name: '', lastName: '', motherLastName: ''
  });

  useEffect(() => {
    if (!isCreateProvider) {
      setValueUser({
        ...dataProvider
      });
    } else
      setValueUser({
        code: '', company: '', name: '',
        lastName: '', motherLastName: ''
      });
  }, [isCreateProvider, dataProvider]);

  const handleSubmitProvider = (evt) => {
    evt.preventDefault();
    
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
              { isCreateProvider ? 'Agregar Proveedor' : 'Editar Proveedor' }
            </h5>
          </div>
          <div className="modal-body">
            <form onSubmit={ handleSubmitProvider } id="form-employee">
              <table className="w-100">
                <tbody>
                  { inputProvider &&
                  inputProvider.map(provider =>
                    <tr key={ provider.id } >
                      <td>{ provider.placeholder }</td>
                      <td>
                        <input type={ provider.type } className="form-control mb-2"
                          placeholder={ provider.placeholder } aria-label={ provider.id.toUpperCase() }
                          aria-describedby={ provider.id }
                          style={ {backgroundColor: '#f6eded'} }
                          value={ valueUser[provider.id] || '' }
                          onChange={ (evt) => setValueUser({
                            ...valueUser,
                            [provider.id]: evt.target.value
                          }) }
                        />
                      </td>
                    </tr>
                  )
                  }
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
              form="form-employee"
            >
              <ButtonPersonalized classNameIcon="bi bi-check-circle-fill" isColumn={ true }>
                { isCreateProvider ? 'Agregar Proveedor' : 'Editar Proveedor' }
              </ButtonPersonalized>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalCreateEditProvider.propTypes = {
  isCreateProvider: PropTypes.bool.isRequired,
  dataProvider: PropTypes.object.isRequired,
  setDataSelected: PropTypes.func.isRequired
};

export default ModalCreateEditProvider;