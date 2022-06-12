import { notifyError, notifyInfo, notifySuccess } from '../consts/notifications';

const useSales = () => {
  const getStandardSales = async({value, startDate, endDate, limit}) => {
    const data = await window.electron.invoke('main:get-standard-sales', {value, startDate, endDate, limit});
    if (!data) return false;
    
    return data.map(sales => ({
      ...sales, date: sales.date.toLocaleString()
    }));
  };
  const getStockSales = async({value, startDate, endDate}) => {
    const data = await window.electron.invoke('main:get-stock-sales', {value, startDate, endDate});
    
    return data;
  };
  const getArticleById = async({id}) => {
    const result = await window.electron.invoke('main:get-article-by-id', {id});
    const data = result[0];
    if (!data) return true;

    if (data.statusArticle.toString() === 'locked') {
      notifyInfo('Este producto se encuentra bloqueado');
      return false;
    } else if (data.amount === 0) {
      notifyInfo('Producto sin existencia');
      return false;
    }

    return data;
  };
  const executeSales = async({idUser, total, salesRecords}) => {
    const resultSales = await window.electron.invoke('main:insert-sales', {idUser, total, salesRecords});
    if (resultSales) {
      notifySuccess('Venta generada exitosamente');
      return true;
    } else {
      notifyError('Error al generar venta');
      return false;
    }
  
  };

  return {
    getStandardSales, getStockSales, getArticleById, executeSales
  };
};

export default useSales;