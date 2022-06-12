
import { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import { notifyError } from '../consts/notifications';
import useSales from '../hooks/useSales';
import Auth from './Auth';

const SalesContext = createContext({});

export const SalesProvider = ({ children }) => {
  const [listSales, setListSales] = useState([]);
  const {executeSales} = useSales();
  const {userData} = useContext(Auth);

  const handleAddedArticleInTable = ({code, stock, amount, price, name}) => {
    const findArticle = listSales.findIndex(sales => sales.idArticle === Number(code));
    let newListSales = [];

    let resultOperation = false;

    if (findArticle !== -1) {

      const isValid = !(listSales[findArticle].amount + Number(amount) > listSales[findArticle].stock);
          
      if (isValid) {
        resultOperation = true;

        newListSales = listSales.map((sales, index) => {
          if (index === findArticle) {
            return {
              ...sales,
              amount: sales.amount + Number(amount),
              total: sales.total + Number(amount) * Number(price)
            };
          }
          return { ...sales };
        });
      } else {
        newListSales = [...listSales];
        notifyError('Movimiento no valido: Futura venta ha excedido la existencia');
      }
    } else {
      if (Number(amount) > Number(stock)) {
        newListSales = [...listSales];
        notifyError('Movimiento no valido: Futura venta ha excedido la existencia');
      } else {
        resultOperation = true;
        newListSales = [
          ...listSales,
          {
            idArticle: Number(code), salesPrice: Number(price), amount: Number(amount),
            total: Number(price) * Number(amount), article: name, stock: Number(stock)
          }
        ];
      }
    }
    setListSales(newListSales);

    return resultOperation;
  };
  const handleCancelSale = () => {
    setListSales([]);
  };
  const handleDeleteSale = ({idArticle}) => {
    setListSales(listSales.filter(sales => sales.idArticle !== idArticle));
  };
  const handleExecuteSales = ({callback}) => {
    const total = listSales.reduce((acc, current) => acc + Number(current.total), 0);
    const idUser = userData.id;

    executeSales({idUser, total, salesRecords: listSales}).then(response => {
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
