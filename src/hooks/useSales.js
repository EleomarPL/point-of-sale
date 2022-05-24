const useSales = () => {
  const getStandardSales = async({value, startDate, endDate, limit}) => {
    const data = await window.electron.invoke('main:get-standard-sales', {value, startDate, endDate, limit});
    if (!data) return false;
    
    return data.map(sales => ({
      ...sales, date: sales.date.toLocaleString()
    }));
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