const {ipcMain} = require('electron');

const {insertAdmin} = require('../db/inserts');
const {updateUsernameAdmin, updatePasswordAdmin} = require('../db/updates');

const triggerEventsAdmin = ({windowToSend}) => {
  ipcMain.on('main:insert-admin', async(_, { name, lastName, motherLastName, age, isAMan, username, password }) => {
    const resultOperation = await insertAdmin({
      name, lastName, motherLastName, age, isAMan, username, password
    });
    
    windowToSend.webContents.send('render:insert-admin', resultOperation);
  });
  ipcMain.on('main:update-username-admin', async(_, { id, username }) => {
    const resultOperation = await updateUsernameAdmin({id, username});
    
    windowToSend.webContents.send('render:update-username-admin', resultOperation);
  });
  ipcMain.on('main:update-password-admin', async(_, { id, password }) => {
    const resultOperation = await updatePasswordAdmin({id, password});
    
    windowToSend.webContents.send('render:update-password-admin', resultOperation);
  });
};

module.exports = {triggerEventsAdmin};