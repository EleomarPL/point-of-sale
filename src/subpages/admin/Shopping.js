import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    setDataShopping([
      {
        code: 1, article: 'Article', company: 'Company', quantity: 11, price: 11, total: 11
      },
      {
        code: 2, article: 'Article2', company: 'Company2', quantity: 22, price: 22, total: 22
      }
    ]);
  }, []);

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
