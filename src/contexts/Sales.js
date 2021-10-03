
import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const SalesContext = createContext({});

export const SalesProvider = ({ children }) => {
  const [listSales, setListSales] = useState([]);
  return (
    <SalesContext.Provider value={ { listSales, setListSales } }>
      { children }
    </SalesContext.Provider>
  );
};

SalesProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default SalesContext;
