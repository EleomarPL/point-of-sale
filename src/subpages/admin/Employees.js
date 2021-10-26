import { lazy, Suspense, useEffect, useState } from 'react';

import {openmodalCreateEditEmployee} from '../../components/modals/ModalCreateEditEmployee';
import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import TablePersonalized from '../../components/common/TablePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';
import SpinnerLoadingPage from '../../components/common/SpinnerLoadingPage';
import useEmployee from '../../hooks/useEmployee';

const ModalCreateEditEmployee = lazy(() => import('../../components/modals/ModalCreateEditEmployee'));

const Employees = () => {
  const [searcher, setSearcher] = useState('');
  const [dataEmployees, setDataEmployees] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [isCreateEmployee, setIsCreateEmployee] = useState(true);
  const {getEmployees} = useEmployee();

  useEffect(() => {
    getEmployees({value: searcher, limit: 50});
  }, [searcher]);
  useEffect(() => {
    window.electron.on('render:get-employees', (err, data) => {
      if (!err) {
        console.log('error insert purchases');
        return null;
      }
      if (data)
        setDataEmployees(data.map(employee => {
          return {
            ...employee, code: employee.id,
            status: employee.statusUser === 'locked' ? 'Bloqueado' : 'Activo'
          };
        }));
    });

    return () => {
      window.electron.removeAllListeners('render:get-employees');
    };
  }, []);

  let header = [
    'Codigo', 'Nombre', 'Apellido Paterno',
    'Apellido Materno', 'Sexo', 'Edad', 'Estado'
  ];
  let properties = [
    'code', 'name', 'lastName',
    'motherLastName', 'gender', 'age', 'status'
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
      disabled: dataSelected.code === undefined,
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
      <Suspense fallback={ <SpinnerLoadingPage /> }>
        <ModalCreateEditEmployee
          dataEmployee={ dataSelected }
          isCreateEmployee={ isCreateEmployee }
          setDataSelected={ setDataSelected }
        />
      </Suspense>
    </div>
  );
};

export default Employees;