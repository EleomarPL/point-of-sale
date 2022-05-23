import { notifyError, notifySuccess, notifyWarning } from '../consts/notifications';

const useEmployee = () => {
  const getEmployees = async({value, limit}) => {
    const data = await window.electron.invoke('main:get-employees', {value, limit});
    if (!data) return false;

    return data.map(employee => ({
      ...employee, code: employee.id,
      status: employee.statusUser === 'locked' ? 'Bloqueado' : 'Activo'
    }));
  };
  const insertEmployee = async({name, lastName, motherLastName, age, isAMan, username, password}) => {
    const data = await window.electron.invoke('main:insert-employee', {
      name, lastName, motherLastName, age, isAMan, username, password
    });
    if (data) notifySuccess('Empleado agregado correctamente');
    else notifyWarning('Ingrese un diferente nombre de usuario');

    return data;
  };
  const updateStatusEmployee = async({id, willIsLocked}) => {
    const data = await window.electron.invoke('main:update-status-employee', {id, willIsLocked});
    if (data.affectedRows) notifySuccess('Estado del empleado actualizado correctamente');
    else notifyError('Estado del empleado no actualizado');

    return data.affectedRows;
  };
  const updateEmployee = async({id, age, username, password}) => {
    const data = await window.electron.invoke('main:update-employee', {id, age, username, password});
    if (data.affectedRows) notifySuccess('Empleado actualizado correctamente');
    else notifyError('Empleado no actualizado');

    return data.affectedRows;
  };
  
  return {
    getEmployees, updateStatusEmployee, insertEmployee, updateEmployee
  };
};

export default useEmployee;