import { useState, useEffect } from 'react';

import SearcherDatePersonalized from '../../../components/common/SearcherDatePersonalized';
import SearcherSelectPersonalized from '../../../components/common/SearcherSelectPersonalized';
import SelectProvider from '../../../components/common/SelectProvider';
import TablePersonalized from '../../../components/common/TablePersonalized';
import GroupRadioOptions from '../../../components/views/GroupRadioOptions';
import useSales from '../../../hooks/useSales';

const Stock = () => {
  const [dataSales, setDataSales] = useState([]);
  const [searcher, setSearcher] = useState('');
  const [valueFirstRadio, setValueFirstRadio] = useState(true);
  const [dataSelected, setDataSelected] = useState({});
  const {getStockSales} = useSales();

  useEffect(() => {
    if (valueFirstRadio) {
      let splitSearcher = searcher.split(' ');
      const startDate = splitSearcher[0];
      const endDate = splitSearcher[1];
      const provider = splitSearcher[2] === 'all' ? '' : splitSearcher[2];

      getStockSales({startDate, endDate, value: provider});
    }
  }, [searcher]);
  useEffect(() => {
    window.electron.on('render:get-stock-sales', (err, data) => {
      if (!err) {
        console.log('error update employee');
        return null;
      }
      if (data)
        setDataSales(data);
      
    });

    return () => {
      window.electron.removeAllListeners('render:get-stock-sales');
    };
  }, []);

  let header = [
    'Caja', 'Empresa', 'Producto',
    'Existencia', 'Vendidos', 'Total Compra'
  ];
  let properties = [
    'id_user', 'company', 'article',
    'amount', 'sold', 'totalPurchases'
  ];

  return (
    <div className="w-100">
      <GroupRadioOptions
        textRadio1="Busqueda por periodo"
        textRadio2="Busqueda por fecha"
        valueRadio1={ valueFirstRadio }
        setValueRadio1={ setValueFirstRadio }
        component1={
          <SearcherSelectPersonalized
            setValue={ setSearcher } keyProvider="all"
          >
            <option value="all">Todos</option>
          </SearcherSelectPersonalized>
        }
        component2={
          <SearcherDatePersonalized setValue={ setSearcher }>
            <SelectProvider />
          </SearcherDatePersonalized>
        }
        className="d-flex justify-content-center"
      />
      <div className="w-100 mt-1">
        <TablePersonalized
          maxHeight="41vh"
          header={ header }
          listData={ dataSales }
          listProperties={ properties }
          setDataSelected={ setDataSelected }
          dataSelected={ dataSelected }
          keyByIndex={ true }
        />
      </div>
    </div>
  );
};

export default Stock;