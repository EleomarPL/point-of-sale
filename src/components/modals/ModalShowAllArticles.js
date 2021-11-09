import { useState } from 'react';
import { Modal } from 'bootstrap';

import TablePersonalized from '../common/TablePersonalized';
import ButtonPersonalized from '../common/ButtonPersonalized';
import SearcherPersonalized from '../common/SearcherPersonalized';

export const openmodalShowAllArticles = () => {
  let myModal = new Modal(
    document.getElementById('modalShowAllArticles'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalShowAllArticles = () => {
  const [searcher, setSearcher] = useState('');
  const [dataArticles, setDataArticles] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [isShowLockedArticle, setIsShowLockedArticle] = useState(true);

  let header = [
    'Codigo', 'Articulo', 'Precio',
    'Existencia', 'Estado'
  ];
  let properties = [
    'code', 'article', 'salesPrice',
    'amount', 'statusArticle'
  ];
  
  return (
    <div className="modal fade" id="modalShowAllArticles"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalShowAllArticlesLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
        <div className="modal-content"
          style={ {backgroundColor: '#bed7aa'} }
        >
          <div className="modal-header my-0 py-0">
            <h5 className="modal-title w-100 text-center my-2" id="modalShowAllArticlesLabel">
              Mostrar todos los artículos
            </h5>
            <button type="button" className="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-0 m-0" style={ {overflow: 'auto'} }>
            <div className="my-2 d-flex justify-content-center align-items-center">
              <SearcherPersonalized
                placeholder="Id - Articulo"
                value={ searcher }
                setValue={ setSearcher }
                title="Buscar"
              />
              <div className="form-check" style={ {marginLeft: '1rem'} }>
                <input className="form-check-input" type="checkbox"
                  id="checkbox-show-article"
                  checked={ isShowLockedArticle }
                  onChange={ () => setIsShowLockedArticle(!isShowLockedArticle) }
                />
                <label className="form-check-label" htmlFor="checkbox-show-article">
                  Mostrar Artículos Bloqueados
                </label>
              </div>
            </div>
            <TablePersonalized
              header={ header }
              maxHeight={ '64vh' }
              listData={ dataArticles }
              listProperties={ properties }
              setDataSelected={ setDataSelected }
              dataSelected={ dataSelected }
            />
            <div className="d-flex justify-content-around"
              style={ {fontSize: '1.4rem'} }
            >
              <strong>Cantidad Productos: 0.00</strong>
              <strong>Total Productos: 0.00</strong>
            </div>
          </div>
          <div className="modal-footer m-0 p-0 w-100 d-flex justify-content-center">
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
  );
};

export default ModalShowAllArticles;