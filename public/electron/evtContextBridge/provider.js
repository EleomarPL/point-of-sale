const { ipcMain } = require('electron');

const { getProviders, getProviderIdCompany } = require('../db/consults');
const { insertProvider } = require('../db/inserts');
const { updateProvider } = require('../db/updates');

const triggerEventsProvider = ({windowToSend}) => {

  ipcMain.handle('main:get-provider', async(event, { keyword, limit }) => {
    try {
      const dataProviders = await getProviders({value: keyword, limit});
      return dataProviders;
    } catch (error) {
      return false;
    }
  });
  ipcMain.handle('main:get-provider-forselect', async() => {
    try {
      const dataProviders = await getProviderIdCompany();
      return dataProviders;
    } catch (error) {
      return false;
    }
  });
  ipcMain.handle('main:insert-provider', async(_, { name, lastName, motherLastName, company }) => {
    try {
      const dataInsertProvider = await insertProvider({name, lastName, motherLastName, company});
      return dataInsertProvider;
    } catch (error) {
      return false;
    }
  });
  ipcMain.handle('main:update-provider', async(_, {id, name, lastName, motherLastName}) => {
    try {
      const dataUpdateProvider = await updateProvider({id, name, lastName, motherLastName});
      return dataUpdateProvider;
    } catch (error) {
      return false;
    }
  });
};

module.exports = {
  triggerEventsProvider
};