const useSales = () => {
  const getStandardSales = ({value, startDate, endDate, limit}) => {
    window.electron.send('main:get-standard-sales', {value, startDate, endDate, limit});
  };

  return {
    getStandardSales
  };
};

export default useSales;