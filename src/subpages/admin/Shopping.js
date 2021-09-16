import React, { useState } from 'react';

import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import SearcherDatePersonalized from '../../components/common/SearcherDatePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';
import GroupRadioOptions from '../../components/views/GroupRadioOptions';
import TablePersonalized from '../../components/common/TablePersonalized';

const Shopping = () => {

  const [searcher, setSearcher] = useState('');
  const [valueFirstRadio, setValueFirstRadio] = useState(true);
  const [dataShopping, setDataShopping] = useState([]);
  const [dataSelected, setDataSelected] = useState({});

  let listShopping = [
    {
      classNameIcon: 'bi bi-cart-plus-fill',
      text: 'Agregar Compra',
      onClick: () => {
        console.log('Open modal shopping');
      }
    }
  ];

  let header = [
    'Codigo', 'Articulo', 'Empresa',
    'Cantidad', 'Precio', 'Total'
  ];
  let properties = [
    'code', 'article', 'company',
    'quantity', 'price', 'total'
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
      <GroupPagesAdmin listButtons={ listShopping }>
        <TablePersonalized
          header={ header }
          listData={ dataShopping }
          listProperties={ properties }
          setDataSelected={ setDataSelected }
          dataSelected={ dataSelected }
        />
      </GroupPagesAdmin>
    </div>
  );
};

export default Shopping;
