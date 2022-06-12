import { useContext } from 'react';

import { notifyInfo, notifyWarning } from '../consts/notifications';
import Auth from '../contexts/Auth';

const useLogin = () => {
  const {setUserData} = useContext(Auth);

  const setNewUserData = (data) => {
    if (data) {
      setUserData({...data});
      window.localStorage.setItem('datauser', JSON.stringify({...data}));
    }
  };
  const login = async({userName, password, setState}) => {
    const result = await window.electron.invoke('main:login', {username: userName, password});
    setState(false);

    if (!result) {
      notifyInfo('Usuario y/o contraseña invalidos');
    } else {
      if (result.statusUser === 'unlocked') {
        setNewUserData({
          ...result,
          type: result.type === 'employee' ? 1 : 0
        });
      } else
        notifyWarning('Usuario bloqueado');
    }
  };
  const logout = () => {
    setUserData(null);
    window.localStorage.removeItem('datauser');
  };
  return {
    login, logout, setNewUserData
  };
};

export default useLogin;