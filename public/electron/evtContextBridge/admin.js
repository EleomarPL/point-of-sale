const {ipcMain} = require('electron');

const {insertAdmin} = require('../db/inserts');

const triggerEventsAdmin = ({windowToSend}) => {
  ipcMain.on('main:insert-admin', async(_, { name, lastName, motherLastName, age, isAMan, username, password }) => {
    const resultOperation = await insertAdmin({
      name, lastName, motherLastName, age, isAMan, username, password
    });
    
    windowToSend.webContents.send('render:insert-admin', resultOperation);
  });
};

module.exports = {triggerEventsAdmin};