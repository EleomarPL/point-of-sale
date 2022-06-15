const { ipcMain } = require('electron');

const {
  validateConnectionToDB, createSQLStructure
} = require('../db/initialOperations');

const triggerEventsInitialOperations = ({windowToSend}) => {
  ipcMain.handle('main:validate-connection-to-db', async() => {
    const isSuccessfulConnection = await validateConnectionToDB();
    return isSuccessfulConnection;
  });
  ipcMain.on('main:create-sql-structure', async() => {
    await createSQLStructure();
    
    windowToSend.webContents.send('render:create-sql-structure', {result: true});
  });
};

module.exports = { triggerEventsInitialOperations };