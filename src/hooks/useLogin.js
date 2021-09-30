import { useContext } from 'react';

import Auth from '../contexts/Auth';

const useLogin = () => {
  const {setUserData} = useContext(Auth);

  const login = ({userName, password}) => {
    let dataUser = null;
    if (userName === 'user123' && password === 'user123') {
      dataUser = {
        name: 'User123', type: 1
      };
      setUserData(dataUser);
      window.localStorage.setItem('datauser', JSON.stringify(dataUser));
    }
    if (userName === 'admin123' && password === 'admin123') {
      dataUser = {
        name: 'Admin123', type: 0
      };
      setUserData(dataUser);
      window.localStorage.setItem('datauser', JSON.stringify(dataUser));
    }
  };
  const logout = () => {
    setUserData(null);
    window.localStorage.removeItem('datauser');
  };
  return {
    login, logout
  };
};

export default useLogin;