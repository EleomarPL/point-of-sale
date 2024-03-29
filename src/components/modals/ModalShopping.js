import { useState, useRef } from 'react';
import { Modal } from 'bootstrap';
import PropTypes from 'prop-types';

import TablePersonalized from '../common/TablePersonalized';
import BoxInputsShoppingModal from '../views/admin/BoxInputsShoppingModal';
import ButtonPersonalized from '../common/ButtonPersonalized';

import SpinnerButtonLoading from '../common/SpinnerButtonLoading';
import useShopping from '../../hooks/useShopping';
import useValidationShopping from '../../hooks/validations/useValidationShopping';

export const openmodalShopping = () => {
  let myModal = new Modal(
    document.getElementById('modalShopping'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalShopping = ({dataShopping, setDataShopping}) => {
  const [dataNewShopping, setDataNewShopping] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [dataProductTemp, setDataProductTemp] = useState([]);
  const [dataSelected2, setDataSelected2] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef({});
  const codeRef = useRef({});

  const { insertPurchases } = useShopping();
  const { validatePossiblePurchase } = useValidationShopping();

  // Data lists to create the table
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

    if (validatePossiblePurchase({event: evt})) {
      let searchArticle = dataNewShopping.findIndex(purchase => purchase.code === evt.target[0].value);
      if (searchArticle !== -1) {
        let newDataToDataNewShopping = dataNewShopping.map((purchase, index) => {
          if (searchArticle === index) {
            return {
              ...purchase, company: evt.target[7].options[evt.target[7].options.selectedIndex].text,
              quantity: Number(purchase.quantity) + Number(evt.target[4].value),
              total: Number(evt.target[2].value) * (Number(purchase.quantity) + Number(evt.target[4].value)),
              idProvider: evt.target[7].value, amount: Number(purchase.quantity) + Number(evt.target[4].value),
              dateofExpiry: evt.target[6].value || null
            };
          } else
            return purchase;
        });

        setDataNewShopping(newDataToDataNewShopping);
      } else {
        setDataNewShopping([
          ...dataNewShopping,
          {
            code: evt.target[0].value, article: evt.target[1].value,
            company: evt.target[7].options[evt.target[7].options.selectedIndex].text,
            purchasePrice: evt.target[2].value,
            salesPrice: evt.target[3].value,
            quantity: evt.target[4].value, isAdded: evt.target[8].value,
            total: evt.target[2].value * evt.target[4].value,
            id: evt.target[0].value, amount: evt.target[4].value,
            idProvider: evt.target[7].value, dateofExpiry: evt.target[6].value || null
          }
        ]);
      }
      formRef.current.reset();
      codeRef.current.focus();
    }
  };
  const handleAddPurchase = () => {
    let myModal = Modal.getInstance( document.getElementById('modalShopping') );
    setIsLoading(true);
    let listPurchases = dataNewShopping.map(purchase => {
      return {
        ...purchase, isAdded: purchase.isAdded === 'true' ? true : false,
        amountShopping: purchase.amount
      };
    });
    insertPurchases({listPurchases}).then(response => {
      setIsLoading(false);
      if (response) {
        listPurchases.reverse();
        let purchasesWithFolio = response.map((result, index) => {
          return {
            ...listPurchases[index], code: result.folio, id: result.folio,
            folio: result.folio, date: result.date
          };
        });
        //purchasesWithFolio.reverse();
        setDataShopping([...purchasesWithFolio, ...dataShopping]);
        setDataNewShopping([]);
        setDataSelected({});
        setDataSelected2({});
        setDataProductTemp([]);
        myModal.hide();
        formRef.current.reset();
      }
    });
  };
  const handleDeleteArticle = () => {
    setDataNewShopping(dataNewShopping.filter(purchase => purchase.code !== dataSelected.code));
    setDataSelected({});
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
                <form onSubmit={ handleAddNewPurchase } id="form-add-shopping"
                  ref={ formRef }
                >
                  <BoxInputsShoppingModal
                    setDataProductTemp={ setDataProductTemp }
                    dataSelected2={ dataSelected2 }
                    setDataSelected2={ setDataSelected2 }
                    codeRef={ codeRef }
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
                <p className="fw-bold" style={ {fontSize: '1.3rem'} }>Total:
                  {
                    ' ' + dataNewShopping.reduce((acc, currentValue) => Number(currentValue.total) + acc, 0)
                  }
                </p>
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
                  disabled={ (isLoading || dataNewShopping.length === 0) }
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
                  disabled={ dataSelected.code === undefined }
                  onClick={ handleDeleteArticle }
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
  dataShopping: PropTypes.array.isRequired,
  setDataShopping: PropTypes.func.isRequired
};

export default ModalShopping;