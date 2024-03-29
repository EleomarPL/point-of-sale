
import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const Auth = createContext({});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(window.localStorage.getItem('datauser')) || null);
  return (
    <Auth.Provider value={ { userData, setUserData } }>
      { children }
    </Auth.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default Auth;
