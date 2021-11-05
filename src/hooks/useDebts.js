const useDebts = () => {
  const getDebtsByKeyword = ({value}) => {
    window.electron.send('main:get-debts', {value, isGroupByDebtor: true});
  };
  const insertDebtor = ({name, lastName, motherLastName, isAMan, address}) => {
    window.electron.send('main:insert-debtor', {name, lastName, motherLastName, isAMan, address});
  };

  return {
    getDebtsByKeyword, insertDebtor
  };
};

export default useDebts;