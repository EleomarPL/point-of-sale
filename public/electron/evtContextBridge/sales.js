const {ipcMain} = require('electron');

const {getStandardSales, getStockSales} = require('../db/consults');
const {insertSales} = require('../db/inserts');

const triggerEventsSales = ({windowToSend}) => {
  ipcMain.on('main:get-standard-sales', async(_, { value, startDate, endDate, limit }) => {
    const dataSales = await getStandardSales({value, startDate, endDate, limit});
    
    windowToSend.webContents.send('render:get-standard-sales', dataSales);
  });
  ipcMain.on('main:get-stock-sales', async(_, { value, startDate, endDate }) => {
    const dataSales = await getStockSales({value, startDate, endDate});
    
    windowToSend.webContents.send('render:get-stock-sales', dataSales);
  });
  ipcMain.on('main:insert-sales', async(_, { idUser, total, salesRecords }) => {
    const dataSales = await insertSales({idUser, total, salesRecords});
    
    windowToSend.webContents.send('render:insert-sales', dataSales);
  });
};

module.exports = {triggerEventsSales};