const {ipcMain} = require('electron');

const {insertDebtor} = require('../db/inserts');

const triggerEventsDebts = ({windowToSend}) => {
  ipcMain.on('main:insert-debtor', async(_, { name, lastName, motherLastName, IsAMan, address }) => {
    const resultOperation = await insertDebtor({name, lastName, motherLastName, IsAMan, address});
    
    windowToSend.webContents.send('render:insert-debtor', resultOperation);
  });
};

module.exports = {triggerEventsDebts};