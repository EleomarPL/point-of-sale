const { ipcMain } = require('electron');

const {
  updateSalesPriceArticle, updateStatusArticle
} = require('../db/updates');
const {
  getArticleById, getArticlesByIdArticle, getArticleForAuxTable, getArticleByIdArticleCompany
} = require('../db/consults');

const triggerEventsArticle = ({windowToSend}) => {
  ipcMain.handle('main:update-salesprice-article', async(_, { id, salesPrice }) => {
    const resultUpdate = await updateSalesPriceArticle({id, salesPrice});
    
    return resultUpdate;
  });
  ipcMain.handle('main:update-status-article', async(_, { id, willItLocked }) => {
    const resultUpdate = await updateStatusArticle({id, willItLocked});
    
    return resultUpdate;
  });
  ipcMain.handle('main:get-article-by-id', async(_, { id }) => {
    try {
      const dataArticle = await getArticleById({id});
      return dataArticle;
    } catch (e) {
      return false;
    }
  });
  ipcMain.handle('main:get-article-by-keyword', async(_, { value, limit }) => {
    const dataArticle = await getArticlesByIdArticle({value, limit});
    
    return dataArticle;
  });
  ipcMain.on('main:get-article-by-keyword-company', async(_, { value }) => {
    const dataArticle = await getArticleByIdArticleCompany({value});
    
    windowToSend.webContents.send('render:get-article-by-keyword-company', dataArticle);
  });
  ipcMain.handle('main:get-article-for-auxtable', async(_, { value }) => {
    try {
      const dataArticle = await getArticleForAuxTable({value});
      return dataArticle;
    } catch (e) {
      return false;
    }
  });
};

module.exports = {triggerEventsArticle};