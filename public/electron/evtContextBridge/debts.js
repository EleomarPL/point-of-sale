const { ipcMain } = require('electron');

const { getDebts, getDebtsFromADebtor, getDebtors } = require('../db/consults');
const { insertDebtor, insertDebt } = require('../db/inserts');
const { payDebt } = require('../db/delete');
const { updateDebtor } = require('../db/updates');

const triggerEventsDebts = () => {
  ipcMain.handle('main:get-debts', async(_, { value, isGroupByDebtor }) => {
    try {
      const dataDebts = await getDebts({value, isGroupByDebtor});
      return dataDebts;
    } catch (e) {
      return false;
    }
  });
  ipcMain.handle('main:get-debts-from-debtor', async(_, { idDebtor }) => {
    try {
      const dataDebts = await getDebtsFromADebtor({idDebtor});
      return dataDebts;
    } catch (e) {
      return false;
    }
  });
  ipcMain.handle('main:insert-debtor', async(_, { name, lastName, motherLastName, isAMan, address }) => {
    try {
      const resultOperation = await insertDebtor({name, lastName, motherLastName, isAMan, address});
      return resultOperation;
    } catch (e) {
      return false;
    }
  });
  ipcMain.handle('main:update-debtor', async(_, { idDebtor, address }) => {
    try {
      const resultOperation = await updateDebtor({idDebtor, address});
      return resultOperation;
    } catch (e) {
      return false;
    }
  });
  ipcMain.handle('main:get-debtors', async(_, { value }) => {
    try {
      const dataDebtors = await getDebtors({value});
      return dataDebtors;
    } catch (e) {
      return false;
    }
  });
  ipcMain.handle('main:insert-debt', async(_, { idDebtor, idUser, listArticles }) => {
    let resultOperation = true;
    
    for ( const article of listArticles ) {
      let result = await insertDebt({
        idDebtor, idArticle: article.idArticle, idUser,
        amount: article.amount, price: article.salesPrice, total: article.total
      });
      if (!result) resultOperation = false;
    }
    return resultOperation;
    /* const resultOperation = await listArticles.forEach(async article => {
      return await insertDebt({
        idDebtor, idArticle: article.idArticle, idUser,
        amount: article.amount, price: article.salesPrice, total: article.total
      });
    }); */
    //return resultOperation;
  });
  ipcMain.handle('main:pay-debt', async(_, { idUser, total, salesRecords }) => {
    const resultOperation = await payDebt({idUser, total, salesRecords});
    return resultOperation;
  });

};

module.exports = {triggerEventsDebts};