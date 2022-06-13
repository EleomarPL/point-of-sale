import { notifyError } from '../../consts/notifications';

const useValidationSales = () => {
  const validateArticleAlreadyAdded = ({alreadyAmount, amount, stock}) => {
    const isValid = !(alreadyAmount + Number(amount) > stock);

    if (!isValid)
      notifyError('Movimiento no valido: Futura venta ha excedido la existencia');

    return isValid;
  };
  const validateNewArticleAdded = ({amount, stock}) => {
    if (Number(amount) > Number(stock)) {
      notifyError('Movimiento no valido: Futura venta ha excedido la existencia');
      return false;
    }

    return true;
  };
  const validateFutureSales = ({listSales, code, name, price, stock, amount}) => {
    const findArticle = listSales.findIndex(sales => sales.idArticle === Number(code));
    let newListSales = [...listSales];

    let resultOperation = false;

    if (findArticle !== -1) {
      if (validateArticleAlreadyAdded({
        alreadyAmount: listSales[findArticle].amount,
        amount,
        stock: listSales[findArticle].stock
      })) {
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
      }
    } else {
      if (validateNewArticleAdded({amount, stock})) {
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

    if (!resultOperation)
      notifyError('Operación no ejecutada: No se pudo agregar el artículo');

    return { resultOperation, newListSales };
  };

  return {
    validateFutureSales
  };
};

export default useValidationSales;