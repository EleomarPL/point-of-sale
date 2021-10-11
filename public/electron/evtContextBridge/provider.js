const {ipcMain} = require('electron');

const {getProviders} = require('../db/consults');

const activateEventsProvider = ({windowToSend}) => {

  ipcMain.on('main:get-provider', async(_, { keyword, limit }) => {
    const dataProviders = await getProviders({value: keyword, limit});
    
    windowToSend.webContents.send('render:get-provider', dataProviders);
  });
};

module.exports = {
  activateEventsProvider
};