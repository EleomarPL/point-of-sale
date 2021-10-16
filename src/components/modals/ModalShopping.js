import { useState } from 'react';
import { Modal } from 'bootstrap';

import TablePersonalized from '../common/TablePersonalized';
import BoxInputsShoppingModal from '../views/admin/BoxInputsShoppingModal';
import ButtonPersonalized from '../common/ButtonPersonalized';
import {isInteger, isObjectValuesNull, isNumberValue, validateLength} from '../../services/validations/generalValidations';
import SpinnerButtonLoading from '../common/SpinnerButtonLoading';

export const openmodalShopping = () => {
  let myModal = new Modal(
    document.getElementById('modalShopping'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalShopping = () => {
  const [dataNewShopping, setDataNewShopping] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [dataProductTemp, setDataProductTemp] = useState([]);
  const [dataSelected2, setDataSelected2] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  let header = [
    'Codigo', 'Articulo', 'Empresa',
    'Cantidad', 'Total'
  ];
  let properties = [
    'code', 'article', 'company',
    'quantity', 'total'
  ];
  let header2 = ['Codigo', 'Articulo'];
  let properties2 = ['code', 'article'];

  const handleAddNewPurchase = (evt) => {
    evt.preventDefault();

    let dataPurchase = {
      code: {
        name: 'Codigo',
        minLength: 2,
        maxLength: 20,
        value: evt.target[0].value
      },
      article: {
        name: 'Producto',
        minLength: 2,
        maxLength: 100,
        value: evt.target[1].value
      },
      purchasePrice: {
        name: 'Precio Compra',
        minLength: 0,
        maxLength: 6,
        value: evt.target[2].value
      },
      salesPrice: {
        name: 'Precio Venta',
        minLength: 0,
        maxLength: 6,
        value: evt.target[3].value
      },
      stock: {
        name: 'Existencia',
        minLength: 0,
        maxLength: 6,
        value: evt.target[4].value
      },
      amount: {
        name: 'Cantidad',
        minLength: 0,
        maxLength: 6,
        value: evt.target[5].value
      }
    };
    
    if ( !isObjectValuesNull(dataPurchase) && validateLength(dataPurchase) ) {
      if (isInteger({name: 'Codigo', value: dataPurchase.code.value}) &&
        isInteger({name: 'Existencia', value: dataPurchase.stock.value}) &&
        isInteger({name: 'Cantidad', value: dataPurchase.amount.value})
      ) {
        if (isNumberValue({name: 'Precio Compra', value: dataPurchase.purchasePrice.value}) &&
          isNumberValue({name: 'Precio Venta', value: dataPurchase.salesPrice.value})
        ) {
          console.log('passed the test');
        }
      }
    }
  };
  const handleAddPurchase = () => {
    setIsLoading(true);
  };

  return (
    <div className="modal fade" id="modalShopping"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalShoppingLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
        <div className="modal-content"
          style={ {backgroundColor: '#bed7aa'} }
        >
          <div className="modal-header my-0 py-0">
            <h5 className="modal-title w-100 text-center my-2" id="modalModifyProductLabel">
              Agregar Compra
            </h5>
            <button type="button" className="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-0 m-0" style={ {overflow: 'auto'} }>
            <div className="row col-md-12">
              <div className="col-md-5">
                <form onSubmit={ handleAddNewPurchase } id="form-add-shopping">
                  <BoxInputsShoppingModal
                    setDataNewShopping={ setDataNewShopping }
                    setDataProductTemp={ setDataProductTemp }
                    dataSelected2={ dataSelected2 }
                    setDataSelected2={ setDataSelected2 }
                  />
                </form>
                <div className="w-100 mt-1">
                  <TablePersonalized
                    header={ header2 }
                    maxHeight='30vh'
                    listData={ dataProductTemp }
                    listProperties={ properties2 }
                    setDataSelected={ setDataSelected2 }
                    dataSelected={ dataSelected2 }
                  />
                </div>
              </div>
              <div className="col-md-7">
                <TablePersonalized
                  header={ header }
                  maxHeight='73vh'
                  listData={ dataNewShopping }
                  listProperties={ properties }
                  setDataSelected={ setDataSelected }
                  dataSelected={ dataSelected }
                />
                <p className="fw-bold" style={ {fontSize: '1.3rem'} }>Total: </p>
              </div>
            </div>
          </div>
          <div className="modal-footer m-0 p-0 w-100">
            <div className="row col-md-12">
              <div className="col-md-5 d-flex justify-content-center">
                <button type="submit" className="button-btn-modals"
                  form="form-add-shopping"
                >
                  <ButtonPersonalized classNameIcon="bi bi-cart-plus-fill" isColumn={ true }>
                    Agregar Compra
                  </ButtonPersonalized>
                </button>
              </div>
              <div className="col-md-7 d-flex justify-content-evenly">
                <button type="button" className="button-btn-modals"
                  onClick={ handleAddPurchase }
                >
                  <ButtonPersonalized classNameIcon="bi bi-check-circle-fill" isColumn={ true }>
                    <span>
                      { isLoading &&
                        <SpinnerButtonLoading />
                      }
                      Confirmar Compra
                    </span>
                  </ButtonPersonalized>
                </button>
                <button type="button" className="button-btn-modals"
                  disabled
                >
                  <ButtonPersonalized classNameIcon="bi bi-trash-fill" isColumn={ true }>
                    Eliminar Compra
                  </ButtonPersonalized>
                </button>
                <button type="button" className="button-btn-modals"
                  data-bs-dismiss="modal"
                >
                  <ButtonPersonalized classNameIcon="bi bi-x-circle-fill" isColumn={ true }>
                    Salir
                  </ButtonPersonalized>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalShopping.propTypes = {
  
};

export default ModalShopping;