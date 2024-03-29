import { useEffect, useState } from 'react';
import { Modal } from 'bootstrap';
import PropTypes from 'prop-types';

import {inputProvider} from '../../data/admin/modalProvider';
import ButtonPersonalized from '../common/ButtonPersonalized';
import SpinnerButtonLoading from '../common/SpinnerButtonLoading';
import useProvider from '../../hooks/useProvider';
import useValidationProvider from '../../hooks/validations/useValidationProvider';
import { notifySuccess, notifyError } from '../../consts/notifications';
import { updateArray } from '../../utils/updateArray';

export const openmodalCreateEditProvider = () => {
  let myModal = new Modal(
    document.getElementById('modalEditCreateProvider'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalCreateEditProvider = ({isCreateProvider, dataSelected, dataProvider, setDataProvider, setDataSelected}) => {
  const [valueProvider, setValueProvider] = useState({
    code: '', company: '', name: '', lastName: '', motherLastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const { validateCreationProvider, validateEditProvider } = useValidationProvider();
  const {createProvider, editProvider} = useProvider();

  useEffect(() => {
    if (!isCreateProvider) {
      setValueProvider({
        ...dataSelected
      });
    } else
      setValueProvider({
        code: '', company: '', name: '',
        lastName: '', motherLastName: ''
      });
  }, [isCreateProvider, dataSelected]);

  const handleSubmitProvider = (evt) => {
    evt.preventDefault();

    let myModal = Modal.getInstance( document.getElementById('modalEditCreateProvider') );
    if (isCreateProvider) {
      if ( validateCreationProvider({event: evt}) ) {
        setIsLoading(true);
        createProvider({
          company: evt.target[0].value, name: evt.target[1].value,
          lastName: evt.target[2].value, motherLastName: evt.target[3].value
        }).then(response => {
          setIsLoading(false);
          if (response.affectedRows === 1) {
            setDataProvider([
              {
                code: response.insertId,
                company: evt.target[0].value,
                name: evt.target[1].value,
                lastName: evt.target[2].value,
                motherLastName: evt.target[3].value
              },
              ...dataProvider
            ]);
            notifySuccess('Proveedor agregado correctamente');
            setDataSelected({});
            myModal.hide();
          } else
            notifyError('No ha sido posible agregar proveedor');
        });
      }
    } else {
      if (validateEditProvider({event: evt}) ) {
        setIsLoading(true);
        editProvider({
          id: valueProvider.code, name: evt.target[1].value,
          lastName: evt.target[2].value, motherLastName: evt.target[3].value
        }).then(response => {
          setIsLoading(false);
          if (response) {
            notifySuccess('Proveedor actualizado correctamente');
            const updateProviderArray = updateArray({
              array: dataProvider,
              item: {
                code: valueProvider.code,
                company: evt.target[0].value,
                name: evt.target[1].value,
                lastName: evt.target[2].value,
                motherLastName: evt.target[3].value
              },
              key: 'code'
            });

            setDataProvider(updateProviderArray);
            setDataSelected({});
            myModal.hide();
          } else
            notifyError('No ha sido posible actualizar proveedor');
        });
        
      }
    }

  };

  return (
    <div className="modal fade" id="modalEditCreateProvider"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalEditCreateProviderLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={ {backgroundColor: '#bed7aa'} }>
          <div className="modal-header">
            <h5 className="modal-title m-auto" id="modalEditCreateProviderLabel">
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
              disabled={ isLoading }
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
  dataSelected: PropTypes.object.isRequired,
  dataProvider: PropTypes.array.isRequired,
  setDataProvider: PropTypes.func.isRequired,
  setDataSelected: PropTypes.func.isRequired
};

export default ModalCreateEditProvider;