const {ipcMain} = require('electron');

const {updateSalesPriceArticle, updateStatusArticle} = require('../db/updates');
const {getArticleById} = require('../db/consults');

const triggerEventsArticle = ({windowToSend}) => {
  ipcMain.on('main:update-salesprice-article', async(_, { id, salesPrice }) => {
    const resultUpdate = await updateSalesPriceArticle({id, salesPrice});
    
    windowToSend.webContents.send('render:update-salesprice-article', resultUpdate);
  });
  ipcMain.on('main:update-status-article', async(_, { id, willItLocked }) => {
    const resultUpdate = await updateStatusArticle({id, willItLocked});
    
    windowToSend.webContents.send('render:update-status-article', resultUpdate);
  });
  ipcMain.on('main:get-article-by-id', async(_, { id }) => {
    const dataArticle = await getArticleById({id});
    
    windowToSend.webContents.send('render:get-article-by-id', dataArticle);
  });
};

module.exports = {triggerEventsArticle};