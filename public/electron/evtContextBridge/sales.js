const { ipcMain } = require('electron');

const { getStandardSales, getStockSales } = require('../db/consults');
const { insertSales } = require('../db/inserts');

const triggerEventsSales = ({windowToSend}) => {
  ipcMain.handle('main:get-standard-sales', async(_, { value, startDate, endDate, limit }) => {
    try {
      const dataSales = await getStandardSales({value, startDate, endDate, limit});
      return dataSales;
    } catch (e) {
      return false;
    }
  });
  ipcMain.handle('main:get-stock-sales', async(_, { value, startDate, endDate }) => {
    try {
      const dataSales = await getStockSales({value, startDate, endDate});
      return dataSales;
    } catch (e) {
      return false;
    }
  });
  ipcMain.on('main:insert-sales', async(_, { idUser, total, salesRecords }) => {
    const dataSales = await insertSales({idUser, total, salesRecords});
    
    windowToSend.webContents.send('render:insert-sales', dataSales);
  });
};

module.exports = {triggerEventsSales};