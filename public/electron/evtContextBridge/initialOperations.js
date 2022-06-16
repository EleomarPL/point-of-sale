const { ipcMain } = require('electron');

const {
  validateConnectionToDB, createSQLStructure
} = require('../db/initialOperations');

const triggerEventsInitialOperations = ({windowToSend}) => {
  ipcMain.handle('main:validate-connection-to-db', async() => {
    const isSuccessfulConnection = await validateConnectionToDB();
    return isSuccessfulConnection;
  });
  ipcMain.handle('main:create-sql-structure', async() => {
    const result = await createSQLStructure();
    return result;
  });
};

module.exports = { triggerEventsInitialOperations };