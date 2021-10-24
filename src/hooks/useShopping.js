const useShopping = () => {
  const getPurchases = ({value, startDate, endDate, limit}) => {
    window.electron.send('main:get-purchases', {value, startDate, endDate, limit});
  };
  const insertPurchases = ({listPurchases}) => {
    window.electron.send('main:insert-purchases', {listPurchases});
  };

  return {
    getPurchases, insertPurchases
  };
};

export default useShopping;