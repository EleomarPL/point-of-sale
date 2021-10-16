import { useEffect, useState } from 'react';
import { Modal } from 'bootstrap';
import PropTypes from 'prop-types';

import {inputProvider} from '../../data/admin/modalProvider';
import {isObjectValuesNull, validateLength} from '../../services/validations/generalValidations';
import ButtonPersonalized from '../common/ButtonPersonalized';
import SpinnerButtonLoading from '../common/SpinnerButtonLoading';

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
  const [valueProvider, setValueProvider] = useState({
    code: '', company: '', name: '', lastName: '', motherLastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isCreateProvider) {
      setValueProvider({
        ...dataProvider
      });
    } else
      setValueProvider({
        code: '', company: '', name: '',
        lastName: '', motherLastName: ''
      });
  }, [isCreateProvider, dataProvider]);

  const handleSubmitProvider = (evt) => {
    evt.preventDefault();
    let dataProvider = {
      company: {
        name: 'Empresa',
        minLength: 2,
        maxLength: 30,
        value: evt.target[0].value
      },
      name: {
        name: 'Nombre',
        minLength: 2,
        maxLength: 40,
        value: evt.target[1].value
      },
      lastName: {
        name: 'Apellido paterno',
        minLength: 2,
        maxLength: 40,
        value: evt.target[2].value
      },
      motherLastName: {
        name: 'Apellido materno',
        minLength: 2,
        maxLength: 40,
        value: evt.target[3].value
      }
    };
    if ( !isObjectValuesNull(dataProvider) && validateLength(dataProvider) ) {
      setIsLoading(true);
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
                          value={ valueProvider[provider.id] || '' }
                          onChange={ (evt) => setValueProvider({
                            ...valueProvider,
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
                <span>
                  { isLoading &&
                    <SpinnerButtonLoading />
                  }
                  { isCreateProvider ? 'Agregar Proveedor' : 'Editar Proveedor' }
                </span>
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