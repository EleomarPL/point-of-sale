const { ipcMain } = require('electron');

const { getEmployees } = require('../db/consults');
const { insertEmployee } = require('../db/inserts');
const { updateUsernamePasswordAgeEmployee, updateStatusEmployee } = require('../db/updates');

const triggerEventsEmployee = ({windowToSend}) => {
  ipcMain.on('main:get-employees', async(_, { value, limit }) => {
    const dataEmployees = await getEmployees({value, limit});
    
    windowToSend.webContents.send('render:get-employees', dataEmployees);
  });
  ipcMain.on('main:insert-employee', async(_, { name, lastName, motherLastName, age, isAMan, username, password }) => {
    const resultOperation = await insertEmployee({name, lastName, motherLastName, age, isAMan, username, password});
    
    windowToSend.webContents.send('render:insert-employee', resultOperation);
  });
  ipcMain.on('main:update-employee', async(_, { id, age, username, password }) => {
    const resultOperation = await updateUsernamePasswordAgeEmployee({
      id, age, username, password
    });
    
    windowToSend.webContents.send('render:update-employee', resultOperation);
  });
  ipcMain.on('main:update-status-employee', async(_, { id, willIsLocked }) => {
    const resultOperation = await updateStatusEmployee({id, willIsLocked});
    
    windowToSend.webContents.send('render:update-status-employee', resultOperation);
  });
};

module.exports = {triggerEventsEmployee};