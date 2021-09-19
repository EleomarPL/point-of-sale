import React, { useState } from 'react';
import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import TablePersonalized from '../../components/common/TablePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';

const Products = () => {
  const [searcher, setSearcher] = useState('');
  const [dataProducts, setDataProducts] = useState([]);
  const [dataSelected, setDataSelected] = useState({});

  let header = [
    'Codigo', 'Producto', 'Precio compra',
    'Precio venta', 'Existencia', 'Cantidad', 'Estado'
  ];
  let properties = [
    'code', 'product', 'purchasePrice',
    'salesPrice', 'stock', 'quantity', 'status'
  ];

  let listProviders = [
    {
      classNameIcon: 'bi bi-pencil-fill',
      text: 'Modificar',
      onClick: () => {
        console.log('Open modal modify');
      }
    },
    {
      classNameIcon: 'bi bi-stop-circle-fill',
      text: 'Congelar',
      onClick: () => {
        console.log('Open modal freeze');
      }
    },
    {
      classNameIcon: 'bi bi-patch-check-fill',
      text: 'Descongelar',
      onClick: () => {
        console.log('Open modal thaw');
      }
    }
  ];

  return (
    <div className="w-100">
      <div className="d-flex justify-content-center mt-1">
        <SearcherPersonalized
          placeholder="Empresa"
          title="Buscar"
          value={ searcher }
          setValue={ setSearcher }
        />
      </div>
      <GroupPagesAdmin listButtons={ listProviders } >
        <TablePersonalized
          header={ header }
          listProperties={ properties }
          dataSelected={ dataSelected }
          setDataSelected={ setDataSelected }
          listData={ dataProducts }
        />
      </GroupPagesAdmin>
    </div>
  );
};

export default Products;