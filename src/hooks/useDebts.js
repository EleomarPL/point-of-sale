const useDebts = () => {
  const getDebtsByKeyword = async({value}) => {
    const data = await window.electron.invoke('main:get-debts', {value, isGroupByDebtor: true});
    return data;
  };
  const getDebtors = async({value}) => {
    const dataDebtors = await window.electron.invoke('main:get-debtors', {value});
    if (!dataDebtors) return false;

    return dataDebtors.map(debtor => ({
      ...debtor, code: debtor.id,
      genderUpdated: debtor.gender === 'M' ? 'Masculino' : 'Femenino'
    }));
  };
  const getDebtsFromDebtor = ({idDebtor = 0}) => {
    window.electron.send('main:get-debts-from-debtor', {idDebtor});
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
  const payDebt = ({idUser, total, salesRecords}) => {
    window.electron.send('main:pay-debt', {idUser, total, salesRecords});
  };

  return {
    getDebtsByKeyword, insertDebtor, getDebtors, updateDebtor, addDebt,
    getDebtsFromDebtor, payDebt
  };
};

export default useDebts;