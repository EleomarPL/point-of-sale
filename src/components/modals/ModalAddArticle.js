import { useContext, useState } from 'react';
import { Modal } from 'bootstrap';

import ButtonPersonalized from '../common/ButtonPersonalized';
import ContainerShowProducts from '../views/ContainerShowProducts';
import { inputAddAticle } from '../../data/my/inputAddArticle';
import SalesContext from '../../contexts/Sales';
import { notifyWarning } from '../../consts/notifications';

export const openmodalAddArticle = () => {
  let myModal = new Modal(
    document.getElementById('modalAddArticle'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalAddArticle = () => {
  
  const [searcher, setSearcher] = useState('');
  const [dataSelected, setDataSelected] = useState({});
  const {handleAddedArticleInTable} = useContext(SalesContext);

  const handleCleanModal = () => {
    setDataSelected({});
    setSearcher('');
  };

  const handleAddedArticle = (evt) => {
    evt.preventDefault();

    let myModal = Modal.getInstance( document.getElementById('modalAddArticle') );

    if (dataSelected.code) {
      const resultOperation = handleAddedArticleInTable({
        code: dataSelected.code, stock: dataSelected.amount,
        amount: evt.target[3].value, price: dataSelected.salesPrice,
        name: dataSelected.article
      });
      if (resultOperation) {
        handleCleanModal();
        evt.target[3].value = '';

        myModal.hide();
      }
    } else {
      notifyWarning('Articulo no seleccionado');
    }
  };

  return (
    <div className="modal fade" id="modalAddArticle"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalAddArticleLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        style={ {width: '90vw', maxWidth: 'none', height: '90%'} }
      >
        <div className="modal-content" style={ {backgroundColor: '#bed7aa', height: '100%'} }>
          <div className="modal-header my-0 py-0">
            <h5 className="modal-title w-100 text-center my-2" id="modalModifyProductLabel">
              Agregar Producto
            </h5>
            <button type="button" className="btn-close"
              data-bs-dismiss="modal" aria-label="Close"
              onClick={ handleCleanModal }
            >
            </button>
          </div>
          <div className="modal-body p-0 m-0" style={ {overflow: 'auto'} }>
            <ContainerShowProducts
              searcher={ searcher } setSearcher={ setSearcher }
              dataSelected={ dataSelected } setDataSelected={ setDataSelected }
              classNameTable="col-md-9"
            >
              <div className="col-md-3 overflow-auto d-flex flex-column justify-content-center">
                <form id="form-add-article" onSubmit={ handleAddedArticle }>
                  <table>
                    <tbody>
                      { inputAddAticle &&
                    inputAddAticle.map(inputA =>
                      <tr key={ inputA.id }>
                        <td style={ {paddingBottom: '3rem', verticalAlign: 'middle'} }>
                          <span id={ inputA.id }>{ inputA.placeholder }: </span>
                        </td>
                        <td style={ {paddingBottom: '3rem'} }>
                          <input type="text" className="form-control"
                            placeholder={ inputA.placeholder } aria-label={ inputA.placeholder.toUpperCase() }
                            aria-describedby={ inputA.id } disabled
                            value={ dataSelected[inputA.id] || '' }
                          />
                        </td>
                      </tr>
                    )
                      }
                      <tr>
                        <td style={ {paddingBottom: '3rem', verticalAlign: 'middle'} }>
                          <span id="amount-sales">Cantidad: </span>
                        </td>
                        <td style={ {paddingBottom: '3rem'} }>
                          <input type="text" className="form-control"
                            placeholder="Cantidad" aria-label="Amount"
                            aria-describedby="amount-sales"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </ContainerShowProducts>
          </div>
          <div className="modal-footer m-0 p-0 d-flex justify-content-center">
            <button type="submit" className="button-btn-modals"
              form="form-add-article"
              disabled={ dataSelected.code === undefined }
            >
              <ButtonPersonalized classNameIcon="bi bi-check-circle-fill" isColumn={ true }>
                Agregar Producto
              </ButtonPersonalized>
            </button>
            <button type="button" className="button-btn-modals"
              data-bs-dismiss="modal" style={ {marginLeft: '4rem'} }
              onClick={ handleCleanModal }
            >
              <ButtonPersonalized classNameIcon="bi bi-x-circle-fill" isColumn={ true }>
                Salir
              </ButtonPersonalized>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddArticle;