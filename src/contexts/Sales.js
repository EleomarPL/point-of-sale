
import { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import useSales from '../hooks/useSales';
import Auth from './Auth';
import useValidationSales from '../hooks/validations/useValidationSales';

const SalesContext = createContext({});

export const SalesProvider = ({ children }) => {
  const [listSales, setListSales] = useState([]);

  const { userData } = useContext(Auth);
  const { executeSales } = useSales();
  const { validateFutureSales } = useValidationSales();

  const handleAddedArticleInTable = ({code, stock, amount, price, name}) => {
    const { resultOperation, newListSales } = validateFutureSales({
      listSales: [...listSales], name,
      code, stock, amount, price
    });
    if (resultOperation)
      setListSales(newListSales);

    return resultOperation;
  };
  const handleCancelSale = () => {
    setListSales([]);
  };
  const handleDeleteSale = ({idArticle}) => {
    setListSales(listSales.filter(sales => sales.idArticle !== idArticle));
  };
  const handleExecuteSales = ({callback, change}) => {
    const total = listSales.reduce((acc, current) => acc + Number(current.total), 0);
    const idUser = userData.id;

    executeSales({idUser, total, change, salesRecords: listSales}).then(response => {
      if (response) {
        callback();
        setListSales([]);
      }
    });
  };

  return (
    <SalesContext.Provider
      value={ {
        listSales, setListSales, handleAddedArticleInTable,
        handleCancelSale, handleDeleteSale, handleExecuteSales
      } }
    >
      { children }
    </SalesContext.Provider>
  );
};

SalesProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default SalesContext;
