import { useState, useEffect } from 'react';

import SearcherDatePersonalized from '../../../components/common/SearcherDatePersonalized';
import SearcherSelectPersonalized from '../../../components/common/SearcherSelectPersonalized';
import SelectProvider from '../../../components/common/SelectProvider';
import TablePersonalized from '../../../components/common/TablePersonalized';
import GroupRadioOptions from '../../../components/views/GroupRadioOptions';

const Stock = () => {
  const [dataSales, setDataSales] = useState([]);
  const [searcher, setSearcher] = useState('');
  const [valueFirstRadio, setValueFirstRadio] = useState(true);
  const [dataSelected, setDataSelected] = useState({});

  useEffect(() => {
    setDataSales([
      {
        box: 1, company: 'Company', product: 'Product',
        existence: 10, 'sold': 10, totalPurchase: 10
      }
    ]);
  }, []);

  let header = [
    'Caja', 'Empresa', 'Producto',
    'Existencia', 'Vendidos', 'Total Compra'
  ];
  let properties = [
    'box', 'company', 'product',
    'existence', 'sold', 'totalPurchase'
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
            setValue={ setSearcher }
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
        />
      </div>
    </div>
  );
};

export default Stock;