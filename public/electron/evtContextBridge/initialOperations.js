const { ipcMain } = require('electron');

const { validateConnectionToDB } = require('../db/initialOperations');

const triggerEventsInitialOperations = ({windowToSend}) => {
  ipcMain.on('main:validate-connection-to-db', async() => {
    const isSuccessfulConnection = await validateConnectionToDB();
    
    windowToSend.webContents.send('render:validate-connection-to-db', isSuccessfulConnection);
  });
};

module.exports = { triggerEventsInitialOperations };