import { useEffect, useState, lazy, Suspense } from 'react';

import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import SearcherDatePersonalized from '../../components/common/SearcherDatePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';
import GroupRadioOptions from '../../components/views/GroupRadioOptions';
import TablePersonalized from '../../components/common/TablePersonalized';
import {openmodalShopping} from '../../components/modals/ModalShopping';
import SpinnerLoadingPage from '../../components/common/SpinnerLoadingPage';
import useShopping from '../../hooks/useShopping';

const ModalShopping = lazy(() => import('../../components/modals/ModalShopping'));

const Shopping = () => {

  const [searcher, setSearcher] = useState('');
  const [valueFirstRadio, setValueFirstRadio] = useState(true);
  const [dataShopping, setDataShopping] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const {getPurchases} = useShopping();

  useEffect(() => {
    if (valueFirstRadio)
      getPurchases({value: searcher, limit: 50});
  }, [searcher]);
  useEffect(() => {
    window.electron.on('render:get-purchases', (err, data) => {
      if (!err) {
        console.log('error get purchases');
        return null;
      }
      if (data)
        setDataShopping(data.map(purchase => {
          return {
            ...purchase, code: purchase.folio
          };
        }));
    });

    return () => {
      window.electron.removeAllListeners('render:get-purchases');
    };
  }, []);

  let listShopping = [
    {
      classNameIcon: 'bi bi-cart-plus-fill',
      text: 'Agregar Compra',
      onClick: () => {
        openmodalShopping();
      }
    }
  ];

  let header = [
    'Codigo', 'Articulo', 'Empresa',
    'Cantidad', 'Precio', 'Total'
  ];
  let properties = [
    'code', 'article', 'company',
    'amountShopping', 'purchasePrice', 'total'
  ];

  return (
    <div className="w-100">
      <GroupRadioOptions
        textRadio1="Busqueda por empresa"
        textRadio2="Busqueda por fecha"
        valueRadio1={ valueFirstRadio }
        setValueRadio1={ setValueFirstRadio }
        component1={
          <SearcherPersonalized
            placeholder="Nombre"
            value={ searcher }
            setValue={ setSearcher }
            title="Buscar"
          />
        }
        component2={
          <SearcherDatePersonalized setValue={ setSearcher } />
        }
        className="d-flex justify-content-center"
      />
      <GroupPagesAdmin listButtons={ listShopping }>
        <TablePersonalized
          header={ header }
          listData={ dataShopping }
          listProperties={ properties }
          setDataSelected={ setDataSelected }
          dataSelected={ dataSelected }
        />
      </GroupPagesAdmin>
      <Suspense fallback={ <SpinnerLoadingPage /> }>
        <ModalShopping />
      </Suspense>
    </div>
  );
};

export default Shopping;
