import { useState } from 'react';
import { Modal } from 'bootstrap';

import ButtonPersonalized from '../common/ButtonPersonalized';
import ContainerShowProducts from '../views/ContainerShowProducts';

export const openmodalViewsArticles = () => {
  let myModal = new Modal(
    document.getElementById('modalViewsArticles'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalViewsArticles = () => {
  
  const [searcher, setSearcher] = useState('');
  const [dataSelected, setDataSelected] = useState({});

  const handleCleanModal = () => {
    setDataSelected({});
    setSearcher('');
  };

  return (
    <div className="modal fade" id="modalViewsArticles"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalViewsArticlesLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        style={ {width: '90vw', maxWidth: 'none', height: '90%'} }
      >
        <div className="modal-content" style={ {backgroundColor: '#bed7aa', height: '100%'} }>
          <div className="modal-header my-0 py-0">
            <h5 className="modal-title w-100 text-center my-2" id="modalModifyProductLabel">
              Ver Productos
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
              classNameTable="col-md-12" isQuery={ true }
            />
          </div>
          <div className="modal-footer m-0 p-0 d-flex justify-content-center">
            <button type="button" className="button-btn-modals"
              data-bs-dismiss="modal" onClick={ handleCleanModal }
            >
              <ButtonPersonalized classNameIcon="bi bi-x-circle-fill" isColumn={ true }>
                Cerrar
              </ButtonPersonalized>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalViewsArticles;