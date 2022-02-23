import { useEffect, useState } from 'react';
import { Modal } from 'bootstrap';

import TablePersonalized from '../common/TablePersonalized';
import ButtonPersonalized from '../common/ButtonPersonalized';
import SearcherPersonalized from '../common/SearcherPersonalized';
import useShopping from '../../hooks/useShopping';

export const openmodalShowAllPurchases = () => {
  let myModal = new Modal(
    document.getElementById('modalShowAllPurchases'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalShowAllPurchases = () => {
  const [searcher, setSearcher] = useState('');
  const [dataPurchases, setDataPurchases] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [total, setTotal] = useState(0);
  const {getPurchases} = useShopping();

  useEffect(() => {
    getPurchases({value: searcher});
  }, [searcher]);
  useEffect(() => {
    // Wait for result when getting purchases search
    window.electron.on('render:get-purchases', (err, data) => {
      if (!err) {
        console.log('error get purchases');
        return null;
      }
      if (data)
        setDataPurchases(data.map(purchase => {
          return {
            ...purchase, code: purchase.folio,
            date: purchase.date.toLocaleString()
          };
        }));
    });
    // Delete previous events
    return () => {
      window.electron.removeAllListeners('render:get-purchases');
    };
  }, []);
  useEffect(() => {
    setTotal(dataPurchases.reduce((acc, current) => current.total + acc, 0));
  }, [dataPurchases]);

  // Data lists to create the table
  let header = [
    'Codigo', 'Articulo', 'Empresa',
    'Cantidad', 'Precio', 'Total', 'Fecha'
  ];
  let properties = [
    'code', 'article', 'company',
    'amountShopping', 'purchasePrice', 'total', 'date'
  ];
  
  return (
    <div className="modal fade" id="modalShowAllPurchases"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalShowAllPurchasesLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
        <div className="modal-content"
          style={ {backgroundColor: '#bed7aa'} }
        >
          <div className="modal-header my-0 py-0">
            <h5 className="modal-title w-100 text-center my-2" id="modalShowAllPurchasesLabel">
              Mostrar todas las compras
            </h5>
            <button type="button" className="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-0 m-0" style={ {overflow: 'auto'} }>
            <div className="my-2 d-flex justify-content-center">
              <SearcherPersonalized
                placeholder="Articulo - Empresa"
                value={ searcher }
                setValue={ setSearcher }
                title="Buscar"
              />
            </div>
            <TablePersonalized
              header={ header }
              maxHeight={ '64vh' }
              listData={ dataPurchases }
              listProperties={ properties }
              setDataSelected={ setDataSelected }
              dataSelected={ dataSelected }
            />
            <div className="d-flex justify-content-end">
              <strong style={ {fontSize: '2rem'} }>Total: { total.toFixed(2) }</strong>
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

export default ModalShowAllPurchases;