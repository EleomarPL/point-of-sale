const {ipcMain} = require('electron');

const {updateSalesPriceArticle, updateStatusArticle} = require('../db/updates');

const triggerEventsArticle = ({windowToSend}) => {
  ipcMain.on('main:update-salesprice-article', async(_, { id, salesPrice }) => {
    const resultUpdate = await updateSalesPriceArticle({id, salesPrice});
    
    windowToSend.webContents.send('render:update-salesprice-article', resultUpdate);
  });
  ipcMain.on('main:update-status-article', async(_, { id, willItLocked }) => {
    const resultUpdate = await updateStatusArticle({id, willItLocked});
    
    windowToSend.webContents.send('render:update-status-article', resultUpdate);
  });
};

module.exports = {triggerEventsArticle};