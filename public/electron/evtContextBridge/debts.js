const {ipcMain} = require('electron');

const {getDebts} = require('../db/consults');
const {insertDebtor, insertDebt} = require('../db/inserts');

const triggerEventsDebts = ({windowToSend}) => {
  ipcMain.on('main:get-debts', async(_, { value, isGroupByDebtor }) => {
    const dataDebts = await getDebts({value, isGroupByDebtor});
    
    windowToSend.webContents.send('render:get-debts', dataDebts);
  });
  ipcMain.on('main:insert-debtor', async(_, { name, lastName, motherLastName, isAMan, address }) => {
    const resultOperation = await insertDebtor({name, lastName, motherLastName, isAMan, address});
    
    windowToSend.webContents.send('render:insert-debtor', resultOperation);
  });
  ipcMain.on('main:insert-debt', async(_, { idDebtor, idArticle, idUser, amount, price, total }) => {
    const resultOperation = await insertDebt({idDebtor, idArticle, idUser, amount, price, total});
    
    windowToSend.webContents.send('render:insert-debt', resultOperation);
  });
};

module.exports = {triggerEventsDebts};