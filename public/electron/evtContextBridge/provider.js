const {ipcMain} = require('electron');

const {getProviders} = require('../db/consults');
const {insertProvider} = require('../db/inserts');

const triggerEventsProvider = ({windowToSend}) => {

  ipcMain.on('main:get-provider', async(_, { keyword, limit }) => {
    const dataProviders = await getProviders({value: keyword, limit});
    
    windowToSend.webContents.send('render:get-provider', dataProviders);
  });
  ipcMain.on('main:insert-provider', async(_, { name, lastName, motherLastName, company }) => {
    const dataInsertProvider = await insertProvider({name, lastName, motherLastName, company});

    windowToSend.webContents.send('render:insert-provider', dataInsertProvider);
  });
};

module.exports = {
  triggerEventsProvider
};