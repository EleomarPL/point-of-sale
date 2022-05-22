import { useEffect, useState } from 'react';
import { Modal } from 'bootstrap';
import PropTypes from 'prop-types';

import { inputProduct } from '../../data/admin/modalProduct';
import ButtonPersonalized from '../common/ButtonPersonalized';
import SpinnerButtonLoading from '../common/SpinnerButtonLoading';
import useArticle from '../../hooks/useArticles';
import useValidationArticle from '../../hooks/validations/useValidationArticle';
import { updateArray } from '../../utils/updateArray';

export const openmodalModifyProduct = () => {
  let myModal = new Modal(
    document.getElementById('modalModifyProduct'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalModifyProduct = ({dataSelected, setDataSelected, dataProducts, setDataProducts}) => {
  const [valueProduct, setValueProduct] = useState({
    code: '', product: '', purchasePrice: '', salesPrice: '', stock: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const { validateModifyArticle } = useValidationArticle();
  const {updateSalesPriceArticle} = useArticle();

  useEffect(() => {
    setValueProduct({...dataSelected});
  }, [dataSelected]);

  const handleSubmitProduct = (evt) => {
    evt.preventDefault();

    let myModal = Modal.getInstance( document.getElementById('modalModifyProduct') );
    if (validateModifyArticle({event: evt})) {
      setIsLoading(true);
      updateSalesPriceArticle({id: valueProduct.code, salesPrice: evt.target[2].value}).then(response => {
        setIsLoading(false);
        if (response) {
          const newData = updateArray({
            array: [...dataProducts],
            key: 'code',
            item: {
              code: valueProduct.code,
              salesPrice: evt.target[2].value
            }
          });
          setDataProducts(newData);
          setDataSelected({});
          myModal.hide();
        }
      });
    }
  };

  return (
    <div className="modal fade" id="modalModifyProduct"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalModifyProductLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={ {backgroundColor: '#bed7aa'} }>
          <div className="modal-header">
            <h5 className="modal-title m-auto" id="modalModifyProductLabel">
              Modificar Producto
            </h5>
          </div>
          <div className="modal-body">
            <form onSubmit={ handleSubmitProduct } id="form-employee">
              <table className="w-100">
                <tbody>
                  { inputProduct &&
                  inputProduct.map(product =>
                    <tr key={ product.id } >
                      <td>{ product.placeholder }</td>
                      <td disabled>
                        <input type={ product.type } className="form-control mb-2"
                          placeholder={ product.placeholder } aria-label={ product.id.toUpperCase() }
                          aria-describedby={ product.id }
                          disabled={ product.id !== 'salesPrice' }
                          style={ {backgroundColor: '#f6eded'} }
                          value={ valueProduct[product.id] || '' }
                          onChange={ (evt) => setValueProduct({
                            ...valueProduct,
                            [product.id]: evt.target.value
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
              form="form-employee" disabled={ isLoading }
            >
              <ButtonPersonalized classNameIcon="bi bi-check-circle-fill" isColumn={ true }>
                <span>
                  { isLoading &&
                    <SpinnerButtonLoading />
                  }
                  Modificar Producto
                </span>
              </ButtonPersonalized>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalModifyProduct.propTypes = {
  dataSelected: PropTypes.object.isRequired,
  setDataSelected: PropTypes.func.isRequired,
  dataProducts: PropTypes.array.isRequired,
  setDataProducts: PropTypes.func.isRequired
};

export default ModalModifyProduct;