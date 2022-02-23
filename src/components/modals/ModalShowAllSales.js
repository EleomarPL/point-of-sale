import { useEffect, useState } from 'react';
import { Modal } from 'bootstrap';

import TablePersonalized from '../common/TablePersonalized';
import ButtonPersonalized from '../common/ButtonPersonalized';
import SearcherPersonalized from '../common/SearcherPersonalized';
import useSales from '../../hooks/useSales';

export const openmodalShowAllSales = () => {
  let myModal = new Modal(
    document.getElementById('modalShowAllSales'), {
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};

const ModalShowAllSales = () => {
  const [searcher, setSearcher] = useState('');
  const [dataSales, setDataSales] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const {getStandardSales} = useSales();

  useEffect(() => {
    // Run employee search
    getStandardSales({value: searcher});
  }, [searcher]);
  
  useEffect(() => {
    // Wait for result when getting standard sales
    window.electron.on('render:get-standard-sales', (err, data) => {
      if (!err) {
        console.log('error get standard sales');
        return null;
      }
      
      if (data)
        setDataSales(data.map(sales => {
          return {...sales, date: sales.date.toLocaleString()};
        }));
    });
    // Delete previous events
    return () => {
      window.electron.removeAllListeners('render:get-standard-sales');
    };
  }, []);

  // Data lists to create the table
  let header = [
    'Folio', 'Caja', 'Producto',
    'Vendidos', 'Precio', 'Total Compra', 'Fecha'
  ];
  let properties = [
    'folio', 'id_user', 'article',
    'amount', 'salesPrice', 'total', 'date'
  ];
  
  return (
    <div className="modal fade" id="modalShowAllSales"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1" aria-labelledby="modalShowAllSalesLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
        <div className="modal-content"
          style={ {backgroundColor: '#bed7aa'} }
        >
          <div className="modal-header my-0 py-0">
            <h5 className="modal-title w-100 text-center my-2" id="modalShowAllSalesLabel">
              Mostrar todas las ventas
            </h5>
            <button type="button" className="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-0 m-0" style={ {overflow: 'auto'} }>
            <div className="my-2 d-flex justify-content-center">
              <SearcherPersonalized
                placeholder="Folio - Caja - Artículo"
                value={ searcher }
                setValue={ setSearcher }
                title="Buscar"
              />
            </div>
            <TablePersonalized
              keyByIndex={ true }
              header={ header }
              maxHeight={ '64vh' }
              listData={ dataSales }
              listProperties={ properties }
              setDataSelected={ setDataSelected }
              dataSelected={ dataSelected }
            />
            <div className="d-flex justify-content-end">
              <strong style={ {fontSize: '2rem'} }>Total: {
                Number(dataSales.reduce((acc, current) => current.total + acc, 0)).toFixed(2)
              }</strong>
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

export default ModalShowAllSales;