const {ipcMain} = require('electron');

const {getProviders} = require('../db/consults');
const {insertProvider} = require('../db/inserts');
const {updateProvider} = require('../db/updates');

const triggerEventsProvider = ({windowToSend}) => {

  ipcMain.on('main:get-provider', async(_, { keyword, limit }) => {
    const dataProviders = await getProviders({value: keyword, limit});
    
    windowToSend.webContents.send('render:get-provider', dataProviders);
  });
  ipcMain.on('main:insert-provider', async(_, { name, lastName, motherLastName, company }) => {
    const dataInsertProvider = await insertProvider({name, lastName, motherLastName, company});

    windowToSend.webContents.send('render:insert-provider', dataInsertProvider);
  });
  ipcMain.on('main:update-provider', async({id, name, lastName, motherLastName}) => {
    const dataUpdateProvider = await updateProvider({id, name, lastName, motherLastName});

    windowToSend.webContents.send('render:update-provider', dataUpdateProvider);
  });
};

module.exports = {
  triggerEventsProvider
};