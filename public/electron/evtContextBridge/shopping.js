const { ipcMain } = require('electron');

const { getPurchases } = require('../db/consults');
const { addPurchases } = require('../db/inserts');

const triggerEventsShopping = () => {
  
  ipcMain.handle('main:get-purchases', async(_, {value, startDate, endDate, limit}) => {
    try {
      const dataPurchases = await getPurchases({value, startDate, endDate, limit});
      return dataPurchases;
    } catch (e) {
      return false;
    }
  });
  ipcMain.handle('main:insert-purchases', async(_, {listPurchases}) => {
    try {
      const resultOperation = await addPurchases({listPurchases});
      return resultOperation;
    } catch (e) {
      return false;
    }
  });
};

module.exports = {triggerEventsShopping};