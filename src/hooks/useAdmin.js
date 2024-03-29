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
  const insertAdmin = async({name, lastName, motherLastName, age, isAMan, username, password}) => {
    const result = await window.electron.invoke('main:insert-admin', {
      name, lastName, motherLastName, age, isAMan, username, password
    });
    if (result) {
      notifySuccess('Administrador agregado correctamente');
      return true;
    } else {
      notifySuccess('Error al crear administrador');
      return false;
    }
  };
  const isThereAnAdmin = async() => {
    const result = await window.electron.invoke('main:is-there-an-admin');
    if (result === null)
      notifyError('Error en la base de datos');
    else if (!result)
      notifyInfo('Cree su perfil de administrador');

    return result;
  };
  
  return {
    updatePasswordAdmin, updateUsernameAdmin, insertAdmin, isThereAnAdmin
  };
};

export default useAdmin;