import { lazy, Suspense, useEffect, useState } from 'react';

import {openmodalCreateEditEmployee} from '../../components/modals/ModalCreateEditEmployee';
import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import TablePersonalized from '../../components/common/TablePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';
import SpinnerLoadingPage from '../../components/common/SpinnerLoadingPage';
import useEmployee from '../../hooks/useEmployee';
import { updateStatusArray } from '../../utils/updateArray';

const ModalCreateEditEmployee = lazy(() => import('../../components/modals/ModalCreateEditEmployee'));

const Employees = () => {
  const [searcher, setSearcher] = useState('');
  const [dataEmployees, setDataEmployees] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [isCreateEmployee, setIsCreateEmployee] = useState(true);
  const { getEmployees, updateStatusEmployee } = useEmployee();

  useEffect(() => {
    // Run employee search
    getEmployees({value: searcher, limit: 50}).then(response => {
      if (response) setDataEmployees(response);
    });
  }, [searcher]);

  // Data lists to create the table
  let header = [
    'Codigo', 'Nombre', 'Apellido Paterno',
    'Apellido Materno', 'Sexo', 'Edad', 'Estado'
  ];
  let properties = [
    'code', 'name', 'lastName',
    'motherLastName', 'gender', 'age', 'status'
  ];
  
  // List to create the buttons on the left
  let listProviders = [
    {
      classNameIcon: 'bi bi-person-plus-fill',
      text: 'Agregar',
      onClick: () => {
        setIsCreateEmployee(true);
        setSearcher('');
        openmodalCreateEditEmployee();
      }
    },
    {
      classNameIcon: 'bi bi-pencil-fill',
      text: 'Modificar',
      disabled: dataSelected.code === undefined,
      onClick: () => {
        setIsCreateEmployee(false);
        setSearcher('');
        openmodalCreateEditEmployee();
      }
    },
    {
      classNameIcon: 'bi bi-person-x-fill',
      text: 'Congelar',
      disabled: dataSelected.code === undefined,
      onClick: () => {
        if (dataSelected.code)
          updateStatusEmployee({id: dataSelected.code, willIsLocked: true}).then(response => {
            if (response) {
              const dataUpdated = updateStatusArray({
                array: [...dataEmployees],
                key: 'code',
                valueKey: dataSelected.code,
                keyStatus: 'status',
                willItLocked: true
              });
              setDataEmployees(dataUpdated);
              setDataSelected({});
            }
          });
      }
    },
    {
      classNameIcon: 'bi bi-person-check-fill',
      text: 'Descongelar',
      disabled: dataSelected.code === undefined,
      onClick: () => {
        if (dataSelected.code)
          updateStatusEmployee({id: dataSelected.code, willIsLocked: false}).then(response => {
            if (response) {
              const dataUpdated = updateStatusArray({
                array: [...dataEmployees],
                key: 'code',
                valueKey: dataSelected.code,
                keyStatus: 'status',
                willItLocked: false
              });
              setDataEmployees(dataUpdated);
              setDataSelected({});
            }
          });
      }
    }
  ];

  return (
    <div className="w-100">
      <div className="d-flex justify-content-center mt-1">
        <SearcherPersonalized
          placeholder="Nombre"
          title="Buscar"
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
      { /* Modal injections with code splitting */ }
      <Suspense fallback={ <SpinnerLoadingPage /> }>
        <ModalCreateEditEmployee
          dataSelected={ dataSelected }
          isCreateEmployee={ isCreateEmployee }
          setDataSelected={ setDataSelected }
          dataEmployees={ dataEmployees }
          setDataEmployees={ setDataEmployees }
        />
      </Suspense>
    </div>
  );
};

export default Employees;