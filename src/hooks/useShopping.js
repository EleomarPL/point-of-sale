import { notifyError, notifySuccess } from '../consts/notifications';

const useShopping = () => {
  const getPurchases = async({value, startDate, endDate, limit}) => {
    const data = await window.electron.invoke('main:get-purchases', {value, startDate, endDate, limit});
    if (!data) return false;

    return data.map(purchase => ({
      ...purchase, code: purchase.folio,
      date: purchase.date.toLocaleString()
    }));
  };
  const insertPurchases = async({listPurchases}) => {
    const resultOperation = await window.electron.invoke('main:insert-purchases', {listPurchases});
    if (resultOperation) notifySuccess('Compra realizada correctamente');
    else notifyError('Error al realizar la compra');

    return resultOperation.map(purchase => ({
      ...purchase, date: purchase.date.toLocaleString()
    }));
  };

  return {
    getPurchases, insertPurchases
  };
};

export default useShopping;