const { ipcMain } = require('electron');
const { isThereAnAdmin } = require('../db/consults');

const { insertAdmin } = require('../db/inserts');
const { updateUsernameAdmin, updatePasswordAdmin } = require('../db/updates');

const triggerEventsAdmin = ({windowToSend}) => {
  ipcMain.on('main:insert-admin', async(_, { name, lastName, motherLastName, age, isAMan, username, password }) => {
    const resultOperation = await insertAdmin({
      name, lastName, motherLastName, age, isAMan, username, password
    });
    
    windowToSend.webContents.send('render:insert-admin', resultOperation);
  });
  ipcMain.handle('main:is-there-an-admin', async() => {
    const resultOperation = await isThereAnAdmin();
    return resultOperation;
  });
  ipcMain.handle('main:update-username-admin', async(_, { id, username, password }) => {
    try {
      const resultOperation = await updateUsernameAdmin({id, username, password});
      return resultOperation;
    } catch (e) {
      return false;
    }
  });
  ipcMain.handle('main:update-password-admin', async(_, { id, oldPassword, newPassword }) => {
    try {
      const resultOperation = await updatePasswordAdmin({id, oldPassword, newPassword});
      return resultOperation;
    } catch (e) {
      return false;
    }
  });
};

module.exports = {triggerEventsAdmin};