const {ipcMain} = require('electron');

const {getPurchases} = require('../db/consults');

const triggerEventsShopping = ({windowToSend}) => {
  
  ipcMain.on('main:get-purchases', async(_, {value, startDate, endDate, limit}) => {
    const dataPurchases = await getPurchases({value, startDate, endDate, limit});

    windowToSend.webContents.send('render:get-purchases', dataPurchases);
  });
};

module.exports = {triggerEventsShopping};