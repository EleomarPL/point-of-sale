const { ipcMain } = require('electron');

const { login } = require('../db/consults');

const triggerEventsLogin = () => {
  ipcMain.handle('main:login', async(_, { username, password }) => {
    const dataUser = await login({username, password});
    return dataUser;
  });
};

module.exports = {triggerEventsLogin};