const {ipcMain} = require('electron');

const {login} = require('../db/consults');

const triggerEventsLogin = ({windowToSend}) => {
  ipcMain.on('main:login', async(_, { username, password }) => {
    const dataUser = await login({username, password});
    
    windowToSend.webContents.send('render:login', dataUser);
  });
};

module.exports = {triggerEventsLogin};