import {
  notifyError, notifyInfo, notifySuccess, notifyWarning
} from '../consts/notifications';

const useAdmin = () => {
  const updatePasswordAdmin = async({id, oldPassword, newPassword}) => {
    const data = await window.electron.invoke('main:update-password-admin', {id, oldPassword, newPassword});
    if (data) {
      notifySuccess('Administrador actualizado correctamente');
      return true;
    } else if (data === undefined)
      notifyInfo('Administrador no encontrado');
    else if (data === null)
      notifyWarning('Contraseña incorrecta');
    else
      notifyError('Error en la base de datos');

    return false;
  };
  const updateUsernameAdmin = async({id, username, password}) => {
    const data = await window.electron.invoke('main:update-username-admin', {id, username, password});
    if (data) {
      notifySuccess('Administrador actualizado correctamente');
      return true;
    } else if (data === undefined)
      notifyInfo('Administrador no encontrado');
    else if (data === null)
      notifyWarning('Contraseña incorrecta');
    else
      notifyWarning('Ingrese un diferente nombre de usuario');
    
    return false;
  };
  const insertAdmin = ({name, lastName, motherLastName, age, isAMan, username, password}) => {
    window.electron.send('main:insert-admin', {
      name, lastName, motherLastName, age, isAMan, username, password
    });
  };
  const isThereAnAdmin = () => {
    window.electron.send('main:is-there-an-admin');
  };
  
  return {
    updatePasswordAdmin, updateUsernameAdmin, insertAdmin, isThereAnAdmin
  };
};

export default useAdmin;