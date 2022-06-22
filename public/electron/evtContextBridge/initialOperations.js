const { ipcMain } = require('electron');

const {
  validateConnectionToDB, createSQLStructure, testConnection
} = require('../db/initialOperations');

const triggerEventsInitialOperations = () => {
  ipcMain.handle('main:validate-connection-to-db', async() => {
    const isSuccessfulConnection = await validateConnectionToDB();
    return isSuccessfulConnection;
  });
  ipcMain.handle('main:create-sql-structure', async() => {
    const result = await createSQLStructure();
    return result;
  });
  ipcMain.handle('main:test-connection', async(_, { port, host, username, password, database }) => {
    const result = await testConnection({port, host, username, password, database});
    return result;
  });
};

module.exports = { triggerEventsInitialOperations };