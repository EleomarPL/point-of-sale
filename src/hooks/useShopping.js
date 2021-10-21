const useShopping = () => {
  const getPurchases = ({value, startDate, endDate, limit}) => {
    window.electron.send('main:get-purchases', {value, startDate, endDate, limit});
  };

  return {
    getPurchases
  };
};

export default useShopping;