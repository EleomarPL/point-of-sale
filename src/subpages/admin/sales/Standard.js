import React, { useState } from 'react';

import SearcherDatePersonalized from '../../../components/common/SearcherDatePersonalized';
import SearcherPersonalized from '../../../components/common/SearcherPersonalized';
import TablePersonalized from '../../../components/common/TablePersonalized';
import GroupRadioOptions from '../../../components/views/GroupRadioOptions';

const Standard = () => {
  const [dataSales, setDataSales] = useState([]);
  const [searcher, setSearcher] = useState('');
  const [valueFirstRadio, setValueFirstRadio] = useState(true);
  const [dataSelected, setDataSelected] = useState({});

  let header = [
    'Folio', 'Caja', 'Producto',
    'Vendidos', 'Precio', 'Total Compra', 'Fecha'
  ];
  let properties = [
    'folio', 'box', 'product',
    'sold', 'price', 'totalPurchase', 'date'
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
          <SearcherDatePersonalized />
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

export default Standard;