const useDebts = () => {
  const getDebtsByKeyword = ({value}) => {
    window.electron.send('main:get-debts', {value, isGroupByDebtor: true});
  };

  return {
    getDebtsByKeyword
  };
};

export default useDebts;