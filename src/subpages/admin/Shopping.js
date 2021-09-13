import React, { useState } from 'react';

import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';
import GroupRadioOptions from '../../components/views/GroupRadioOptions';

const Shopping = () => {

  const [searcher, setSearcher] = useState('');

  let listShopping = [
    {
      classNameIcon: 'bi bi-cart-plus-fill',
      text: 'Agregar Compra',
      onClick: () => {
        console.log('Open modal shopping');
      }
    }
  ];

  return (
    <div className="w-100">
      <GroupRadioOptions
        textRadio1="Busqueda por empresa"
        textRadio2="Busqueda por fecha"
        component1={
          <SearcherPersonalized
            placeholder="Nombre"
            value={ searcher }
            setValue={ setSearcher }
            title="Buscar"
          />
        }
        component2={ <p>Componente 2</p> }
        className="d-flex justify-content-center"
      />
      <GroupPagesAdmin listButtons={ listShopping }>
        <p>Compras</p>
      </GroupPagesAdmin>
    </div>
  );
};

export default Shopping;
