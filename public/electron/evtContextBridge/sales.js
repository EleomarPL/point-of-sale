const { ipcMain } = require('electron');

const { getStandardSales, getStockSales } = require('../db/consults');
const { insertSales } = require('../db/inserts');

const triggerEventsSales = () => {
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
  ipcMain.handle('main:insert-sales', async(_, { idUser, total, change, salesRecords }) => {
    const dataSales = await insertSales({idUser, total, change, salesRecords});
    return dataSales;
  });
};

module.exports = {triggerEventsSales};