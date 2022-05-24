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
    // Run stock sales search
    let splitSearcher = searcher.split(' ');
    const startDate = splitSearcher[0];
    const endDate = splitSearcher[1];
    const provider = splitSearcher[2] === 'all' ? '' : splitSearcher[2];

    getStockSales({startDate, endDate, value: provider}).then(response => {
      if (response) setDataSales(response);
    });
  }, [searcher]);
  // Data lists to create the table
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
          <SearcherSelectPersonalized setValue={ setSearcher }>
            <option value="all">Todos</option>
          </SearcherSelectPersonalized>
        }
        component2={
          <SearcherDatePersonalized setValue={ setSearcher } isAddedSelectProvider={ true }>
            <SelectProvider>
              <option value="all">Todos</option>
            </SelectProvider>
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