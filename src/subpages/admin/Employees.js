import { lazy, Suspense, useEffect, useState } from 'react';

import {openmodalCreateEditEmployee} from '../../components/modals/ModalCreateEditEmployee';
import SearcherPersonalized from '../../components/common/SearcherPersonalized';
import TablePersonalized from '../../components/common/TablePersonalized';
import GroupPagesAdmin from '../../components/layouts/GroupPagesAdmin';
import SpinnerLoadingPage from '../../components/common/SpinnerLoadingPage';
import useEmployee from '../../hooks/useEmployee';
import { notifySuccess } from '../../consts/notifications';

const ModalCreateEditEmployee = lazy(() => import('../../components/modals/ModalCreateEditEmployee'));

const Employees = () => {
  const [searcher, setSearcher] = useState('');
  const [dataEmployees, setDataEmployees] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [isCreateEmployee, setIsCreateEmployee] = useState(true);
  const {getEmployees, updateStatusEmployee} = useEmployee();

  useEffect(() => {
    // Run employee search
    getEmployees({value: searcher, limit: 50});
  }, [searcher]);
  useEffect(() => {
    // Wait for result when getting employee search
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
    // Wait for result when updating employee status
    window.electron.on('render:update-status-employee', (err, data) => {
      if (!err) {
        console.log('error update status employee');
        return null;
      }
      if (data) {
        notifySuccess('Estado del empleado actualizado correctamente');
        window.electron.send('main:get-employees', {value: '', limit: 50});
      }
    });
    // Delete previous events
    return () => {
      window.electron.removeAllListeners('render:get-employees');
      window.electron.removeAllListeners('render:update-status-employee');
    };
  }, []);

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
          updateStatusEmployee({id: dataSelected.code, willIsLocked: true});
      }
    },
    {
      classNameIcon: 'bi bi-person-check-fill',
      text: 'Descongelar',
      disabled: dataSelected.code === undefined,
      onClick: () => {
        if (dataSelected.code)
          updateStatusEmployee({id: dataSelected.code, willIsLocked: false});
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
      { /* Modal injections with code splitting */ }
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