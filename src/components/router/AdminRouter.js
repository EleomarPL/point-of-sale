import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from '../../contexts/Auth';

const AdminRouter = ({children}) => {
  const {userData} = useContext(Auth);
  let isLogged = userData === null ? false : true;

  if (isLogged) {
    if (userData.type === 1) return <Navigate to="/my" />;
    else if (userData.type === 0) return children;
  } else return <Navigate to="/" />;
  

};
AdminRouter.propTypes = {
  children: PropTypes.node.isRequired
};

export default AdminRouter;