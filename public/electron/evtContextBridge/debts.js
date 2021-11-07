const {ipcMain} = require('electron');

const {getDebts, getDebtsFromADebtor, getDebtors} = require('../db/consults');
const {insertDebtor, insertDebt} = require('../db/inserts');
const {payDebt} = require('../db/delete');
const { updateDebtor } = require('../db/updates');

const triggerEventsDebts = ({windowToSend}) => {
  ipcMain.on('main:get-debts', async(_, { value, isGroupByDebtor }) => {
    const dataDebts = await getDebts({value, isGroupByDebtor});
    
    windowToSend.webContents.send('render:get-debts', dataDebts);
  });
  ipcMain.on('main:get-debts-from-debtor', async(_, { idDebtor }) => {
    const dataDebts = await getDebtsFromADebtor({idDebtor});
    
    windowToSend.webContents.send('render:get-debts-from-debtor', dataDebts);
  });
  ipcMain.on('main:insert-debtor', async(_, { name, lastName, motherLastName, isAMan, address }) => {
    const resultOperation = await insertDebtor({name, lastName, motherLastName, isAMan, address});
    
    windowToSend.webContents.send('render:insert-debtor', resultOperation);
  });
  ipcMain.on('main:update-debtor', async(_, { idDebtor, address }) => {
    const resultOperation = await updateDebtor({idDebtor, address});
    
    windowToSend.webContents.send('render:update-debtor', resultOperation);
  });
  ipcMain.on('main:get-debtors', async(_, { value }) => {
    const dataDebtors = await getDebtors({value});
    
    windowToSend.webContents.send('render:get-debtors', dataDebtors);
  });
  ipcMain.on('main:insert-debt', async(_, { idDebtor, idUser, listArticles }) => {
    const resultOperation = await listArticles.forEach(async article => {
      return await insertDebt({
        idDebtor, idArticle: article.idArticle, idUser,
        amount: article.amount, price: article.salesPrice, total: article.total
      });
    });
    
    windowToSend.webContents.send('render:insert-debt', resultOperation);
  });
  ipcMain.on('main:pay-debt', async(_, { idUser, total, salesRecords }) => {
    const resultOperation = await payDebt({idUser, total, salesRecords});
    
    windowToSend.webContents.send('render:pay-debt', resultOperation);
  });

};

module.exports = {triggerEventsDebts};