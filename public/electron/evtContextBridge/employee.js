const {ipcMain} = require('electron');

const {getEmployees} = require('../db/consults');
const {insertEmployee} = require('../db/inserts');

const triggerEventsEmployee = ({windowToSend}) => {
  ipcMain.on('main:get-employees', async(_, { value, limit }) => {
    const dataEmployees = await getEmployees({value, limit});
    
    windowToSend.webContents.send('render:get-employees', dataEmployees);
  });
  ipcMain.on('main:insert-employee', async(_, { name, lastName, motherLastName, age, isAMan, username, password }) => {
    const resultOperation = await insertEmployee({name, lastName, motherLastName, age, isAMan, username, password});
    
    windowToSend.webContents.send('render:insert-employee', resultOperation);
  });
};

module.exports = {triggerEventsEmployee};