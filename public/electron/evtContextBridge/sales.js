const {ipcMain} = require('electron');

const {getStandardSales} = require('../db/consults');

const triggerEventsSales = ({windowToSend}) => {
  ipcMain.on('main:get-standard-sales', async(_, { value, startDate, endDate, limit }) => {
    const dataSales = await getStandardSales({value, startDate, endDate, limit});
    
    windowToSend.webContents.send('render:get-standard-sales', dataSales);
  });
};

module.exports = {triggerEventsSales};