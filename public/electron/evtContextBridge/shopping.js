const { ipcMain } = require('electron');

const { getPurchases } = require('../db/consults');
const { addPurchases } = require('../db/inserts');

const triggerEventsShopping = ({windowToSend}) => {
  
  ipcMain.on('main:get-purchases', async(_, {value, startDate, endDate, limit}) => {
    const dataPurchases = await getPurchases({value, startDate, endDate, limit});

    windowToSend.webContents.send('render:get-purchases', dataPurchases);
  });
  ipcMain.on('main:insert-purchases', async(_, {listPurchases}) => {
    const resultOperation = await addPurchases({listPurchases});

    windowToSend.webContents.send('render:insert-purchases', resultOperation);
  });
};

module.exports = {triggerEventsShopping};