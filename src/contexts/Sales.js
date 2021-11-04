
import { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { notifyError } from '../consts/notifications';

const SalesContext = createContext({});

export const SalesProvider = ({ children }) => {
  const [listSales, setListSales] = useState([]);

  const handleAddedArticleInTable = ({code, stock, amount, price}) => {
    const findArticle = listSales.findIndex(sales => sales.idArticle === Number(code));
    let newListSales = [];

    if (findArticle !== -1) {

      const isValid = !(listSales[findArticle].amount + Number(amount) > listSales[findArticle].stock);
          
      if (isValid) {
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
        notifyError('Movimiento no valido: Futura venta ha excedido la existencia');
      } else {
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
  };


  return (
    <SalesContext.Provider value={ { listSales, setListSales, handleAddedArticleInTable } }>
      { children }
    </SalesContext.Provider>
  );
};

SalesProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default SalesContext;
