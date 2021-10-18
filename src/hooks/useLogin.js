import { useContext } from 'react';

import Auth from '../contexts/Auth';

const useLogin = () => {
  const {setUserData} = useContext(Auth);

  const setNewUserData = (data) => {
    if (data) {
      setUserData({...data});
      window.localStorage.setItem('datauser', JSON.stringify({...data}));
    }
  };
  const login = ({userName, password}) => {
    window.electron.send('main:login', {username: userName, password});
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