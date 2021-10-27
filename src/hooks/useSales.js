const useSales = () => {
  const getStandardSales = ({value, startDate, endDate, limit}) => {
    window.electron.send('main:get-standard-sales', {value, startDate, endDate, limit});
  };
  const getStockSales = ({value, startDate, endDate}) => {
    window.electron.send('main:get-stock-sales', {value, startDate, endDate});
  };

  return {
    getStandardSales, getStockSales
  };
};

export default useSales;