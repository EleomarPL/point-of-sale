const {ipcMain} = require('electron');

const {updateSalesPriceArticle} = require('../db/updates');

const triggerEventsArticle = ({windowToSend}) => {
  ipcMain.on('main:update-salesprice-article', async(_, { id, salesPrice }) => {
    const resultUpdate = await updateSalesPriceArticle({id, salesPrice});
    
    windowToSend.webContents.send('render:update-salesprice-article', resultUpdate);
  });
};

module.exports = {triggerEventsArticle};