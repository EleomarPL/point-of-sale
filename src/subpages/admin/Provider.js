import React, { useState } from 'react';
import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import TablePersonalized from '../../components/common/TablePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';

const Provider = () => {
  const [searcher, setSearcher] = useState('');
  const [dataProvider, setDataProvider] = useState([]);
  const [dataSelected, setDataSelected] = useState({});

  let header = [
    'Codigo', 'Empresa', 'Nombre',
    'Apellido paterno', 'Apellido materno'
  ];
  let properties = [
    'code', 'company', 'name',
    'lastName', 'motherLastName'
  ];

  let listProviders = [
    {
      classNameIcon: 'bi bi-person-plus-fill',
      text: 'Agregar',
      onClick: () => {
        console.log('Open modal add');
      }
    },
    {
      classNameIcon: 'bi bi-person-lines-fill',
      text: 'Modificar',
      onClick: () => {
        console.log('Open modal modify');
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
          listData={ dataProvider }
        />
      </GroupPagesAdmin>
    </div>
  );
};

export default Provider;