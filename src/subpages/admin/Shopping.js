import React from 'react';

import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';
import GroupRadioOptions from '../../components/views/GroupRadioOptions';

const Shopping = () => {

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
        component1={ <p>Componente 1</p> }
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