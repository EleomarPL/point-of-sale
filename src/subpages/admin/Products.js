import React, { useState } from 'react';

import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import TablePersonalized from '../../components/common/TablePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';
import ModalModifyProduct from '../../components/modals/ModalModifyProduct';
import {openmodalModifyProduct} from '../../components/modals/ModalModifyProduct';

const Products = () => {
  const [searcher, setSearcher] = useState('');
  const [dataProducts, setDataProducts] = useState([]);
  const [dataSelected, setDataSelected] = useState({});

  let header = [
    'Codigo', 'Producto', 'Precio compra',
    'Precio venta', 'Existencia', 'Estado'
  ];
  let properties = [
    'code', 'product', 'purchasePrice',
    'salesPrice', 'stock', 'status'
  ];

  let listProviders = [
    {
      classNameIcon: 'bi bi-pencil-fill',
      text: 'Modificar',
      disabled: dataSelected.code === undefined,
      onClick: () => {
        openmodalModifyProduct();
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
      <ModalModifyProduct
        dataProduct={ dataSelected }
        setDataSelected={ setDataSelected }
      />
    </div>
  );
};

export default Products;