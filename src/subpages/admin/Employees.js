import React, { useState } from 'react';

import ModalCreateEditEmployee, {openmodalCreateEditEmployee} from '../../components/modals/ModalCreateEditEmployee';
import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import TablePersonalized from '../../components/common/TablePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';

const Employees = () => {
  const [searcher, setSearcher] = useState('');
  const [dataEmployees, setDataEmployees] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [isCreateEmployee, setIsCreateEmployee] = useState(true);

  let header = [
    'Codigo', 'Nombre', 'Apellido Paterno',
    'Apellido Materno', 'Sexo', 'Edad', 'Estado'
  ];
  let properties = [
    'code', 'name', 'lastName',
    'motherLastName', 'gender', 'age', 'state'
  ];

  let listProviders = [
    {
      classNameIcon: 'bi bi-person-plus-fill',
      text: 'Agregar',
      onClick: () => {
        setIsCreateEmployee(true);
        openmodalCreateEditEmployee();
      }
    },
    {
      classNameIcon: 'bi bi-pencil-fill',
      text: 'Modificar',
      onClick: () => {
        setIsCreateEmployee(false);
        openmodalCreateEditEmployee();
      }
    },
    {
      classNameIcon: 'bi bi-person-x-fill',
      text: 'Congelar',
      onClick: () => {
        console.log('Open modal freeze');
      }
    },
    {
      classNameIcon: 'bi bi-person-check-fill',
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
          placeholder="Nombre"
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
          listData={ dataEmployees }
        />
      </GroupPagesAdmin>
      <ModalCreateEditEmployee
        dataEmployee={ dataSelected }
        isCreateEmployee={ isCreateEmployee }
        setDataSelected={ setDataSelected }
      />
    </div>
  );
};

export default Employees;