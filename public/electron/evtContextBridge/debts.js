const {ipcMain} = require('electron');

const {insertDebtor} = require('../db/inserts');

const triggerEventsDebts = ({windowToSend}) => {
  ipcMain.on('main:insert-debtor', async(_, { name, lastName, motherLastName, isAMan, address }) => {
    const resultOperation = await insertDebtor({name, lastName, motherLastName, isAMan, address});
    
    windowToSend.webContents.send('render:insert-debtor', resultOperation);
  });
};

module.exports = {triggerEventsDebts};