const useSales = () => {
  const getStandardSales = ({value, startDate, endDate, limit}) => {
    window.electron.send('main:get-standard-sales', {value, startDate, endDate, limit});
  };
  const getStockSales = ({value, startDate, endDate}) => {
    window.electron.send('main:get-stock-sales', {value, startDate, endDate});
  };
  const getArticleById = ({id}) => {
    window.electron.send('main:get-article-by-id', {id});
  };
  const executeSales = ({idUser, total, salesRecords}) => {
    window.electron.send('main:insert-sales', {idUser, total, salesRecords});
  };

  return {
    getStandardSales, getStockSales, getArticleById, executeSales
  };
};

export default useSales;