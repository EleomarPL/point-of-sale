import { useEffect, useState } from 'react';

import SearcherDatePersonalized from '../../../components/common/SearcherDatePersonalized';
import SearcherPersonalized from '../../../components/common/SearcherPersonalized';
import TablePersonalized from '../../../components/common/TablePersonalized';
import GroupRadioOptions from '../../../components/views/GroupRadioOptions';
import useSales from '../../../hooks/useSales';

const Standard = () => {
  const [dataSales, setDataSales] = useState([]);
  const [searcher, setSearcher] = useState('');
  const [valueFirstRadio, setValueFirstRadio] = useState(true);
  const [dataSelected, setDataSelected] = useState({});
  const {getStandardSales} = useSales();

  useEffect(() => {
    // Run standard sales search
    if (valueFirstRadio)
      getStandardSales({value: searcher, limit: 50}).then(response => {
        if (response) setDataSales(response);
      });
    else if (searcher) {
      const dateSplit = searcher.split(' ');
      const startDate = dateSplit[0];
      const endDate = dateSplit[1];
      getStandardSales({startDate, endDate, limit: 50}).then(response => {
        if (response) setDataSales(response);
      });
    }
  }, [searcher]);
  useEffect(() => {
    // Clean browser for each change of the group of radio buttons
    setSearcher('');
    if (!valueFirstRadio)
      getStandardSales({value: '', limit: 50}).then(response => {
        if (response) setDataSales(response);
      });
  }, [valueFirstRadio]);
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
    <div className="w-100">
      <GroupRadioOptions
        textRadio1="Busqueda por caja"
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

export default Standard;