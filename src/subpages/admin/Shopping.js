import { useEffect, useState, lazy, Suspense } from 'react';

import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import SearcherDatePersonalized from '../../components/common/SearcherDatePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';
import GroupRadioOptions from '../../components/views/GroupRadioOptions';
import TablePersonalized from '../../components/common/TablePersonalized';
import { openmodalShopping } from '../../components/modals/ModalShopping';
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
    // Run employee search
    if (valueFirstRadio)
      getPurchases({value: searcher, limit: 50}).then(response => {
        if (response) setDataShopping(response);
      });
    else if (searcher) {
      const dateSplit = searcher.split(' ');
      const startDate = dateSplit[0];
      const endDate = dateSplit[1];
      getPurchases({limit: 50, startDate, endDate}).then(response => {
        if (response) setDataShopping(response);
      });
    }
  }, [searcher]);
  useEffect(() => {
    // Clean browser for each change of the group of radio buttons
    setSearcher('');
    if (!valueFirstRadio)
      getPurchases({value: '', limit: 50}).then(response => {
        if (response) setDataShopping(response);
      });
  }, [valueFirstRadio]);

  // List to create the buttons on the left
  let listShopping = [
    {
      classNameIcon: 'bi bi-cart-plus-fill',
      text: 'Agregar Compra',
      onClick: () => {
        setSearcher('');
        setValueFirstRadio(true);
        openmodalShopping();
      }
    }
  ];

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
    <div className="w-100">
      <GroupRadioOptions
        textRadio1="Busqueda por empresa"
        textRadio2="Busqueda por fecha"
        valueRadio1={ valueFirstRadio }
        setValueRadio1={ setValueFirstRadio }
        component1={
          <SearcherPersonalized
            placeholder="Nombre"
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
          keyByIndex={ true }
          listData={ dataShopping }
          listProperties={ properties }
          setDataSelected={ setDataSelected }
          dataSelected={ dataSelected }
        />
      </GroupPagesAdmin>
      <Suspense fallback={ <SpinnerLoadingPage /> }>
        <ModalShopping
          dataShopping={ dataShopping }
          setDataShopping={ setDataShopping }
        />
      </Suspense>
    </div>
  );
};

export default Shopping;
