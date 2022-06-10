import { notifyError, notifyInfo, notifySuccess } from '../consts/notifications';

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
  const getDebtsFromDebtor = async({idDebtor = 0}) => {
    const data = await window.electron.send('main:get-debts-from-debtor', {idDebtor});
    if (!data) return false;

    return data.map(debtor => ({
      ...debtor, code: debtor.id
    }));
  };
  const insertDebtor = async({name, lastName, motherLastName, isAMan, address}) => {
    const result = await window.electron.invoke('main:insert-debtor', {name, lastName, motherLastName, isAMan, address});
    if (!result) return false;

    if (result.affectedRows !== 0) {
      notifySuccess('Deudor agregado exitosamente');
      return result;
    } else return false;
  };
  const updateDebtor = async({idDebtor, address}) => {
    const resultOperation = await window.electron.invoke('main:update-debtor', {idDebtor, address});
    if (!resultOperation) {
      notifyError('Error al actualizar el deudor');
      return false;
    }
    if (resultOperation.affectedRows === 0) {
      notifyInfo('Deudor no actualizado');
      return false;
    }
    notifySuccess('Deudor actualizado exitosamente');
    return true;
  };
  const addDebt = async({idDebtor, idUser, listArticles}) => {
    const result = await window.electron.invoke('main:insert-debt', {idDebtor, idUser, listArticles});
    if (result) notifySuccess('Deuda agregada exitosamente');

    return result;
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