const {ipcMain} = require('electron');

const {getEmployees} = require('../db/consults');

const triggerEventsEmployee = ({windowToSend}) => {
  ipcMain.on('main:get-employees', async(_, { value, limit }) => {
    const dataEmployees = await getEmployees({value, limit});
    
    windowToSend.webContents.send('render:get-employees', dataEmployees);
  });
};

module.exports = {triggerEventsEmployee};