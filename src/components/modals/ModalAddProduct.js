import { Modal } from 'bootstrap';

import ButtonPersonalized from '../common/ButtonPersonalized';

export const openmodalAddProduct = () => {
  let myModal = new Modal(
    document.getElementById('modalAddProduct'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalAddProduct = () => {
  return (
    <div className="modal fade" id="modalAddProduct"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalAddProductLabel"
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
              data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-0 m-0" style={ {overflow: 'auto'} }>
            
          </div>
          <div className="modal-footer m-0 p-0 d-flex justify-content-center">
            <button type="button" className="button-btn-modals">
              <ButtonPersonalized classNameIcon="bi bi-check-circle-fill" isColumn={ true }>
                Agregar Producto
              </ButtonPersonalized>
            </button>
            <button type="button" className="button-btn-modals"
              data-bs-dismiss="modal" style={ {marginLeft: '4rem'} }
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

ModalAddProduct.propTypes = {
  
};

export default ModalAddProduct;