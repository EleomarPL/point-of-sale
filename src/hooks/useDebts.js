const useDebts = () => {
  const getDebtsByKeyword = ({value}) => {
    window.electron.send('main:get-debts', {value, isGroupByDebtor: true});
  };
  const getDebtors = ({value}) => {
    window.electron.send('main:get-debtors', {value});
  };
  const insertDebtor = ({name, lastName, motherLastName, isAMan, address}) => {
    window.electron.send('main:insert-debtor', {name, lastName, motherLastName, isAMan, address});
  };
  const updateDebtor = ({idDebtor, address}) => {
    window.electron.send('main:update-debtor', {idDebtor, address});
  };
  const addDebt = ({idDebtor, idUser, listArticles}) => {
    window.electron.send('main:insert-debt', {idDebtor, idUser, listArticles});
  };

  return {
    getDebtsByKeyword, insertDebtor, getDebtors, updateDebtor, addDebt
  };
};

export default useDebts;