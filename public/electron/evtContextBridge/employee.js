const { ipcMain } = require('electron');

const { getEmployees } = require('../db/consults');
const { insertEmployee } = require('../db/inserts');
const { updateUsernamePasswordAgeEmployee, updateStatusEmployee } = require('../db/updates');

const triggerEventsEmployee = () => {
  ipcMain.handle('main:get-employees', async(_, { value, limit }) => {
    try {
      const dataEmployees = await getEmployees({value, limit});
      return dataEmployees;
    } catch (e) {
      return false;
    }
    
  });
  ipcMain.handle('main:insert-employee', async(_, { name, lastName, motherLastName, age, isAMan, username, password }) => {
    try {
      const resultOperation = await insertEmployee({name, lastName, motherLastName, age, isAMan, username, password});
      return resultOperation;
    } catch (e) {
      return false;
    }
  });
  ipcMain.handle('main:update-employee', async(_, { id, age, username, password }) => {
    try {
      const resultOperation = await updateUsernamePasswordAgeEmployee({
        id, age, username, password
      });
      return resultOperation;
    } catch (e) {
      return false;
    }
  });
  ipcMain.handle('main:update-status-employee', async(_, { id, willIsLocked }) => {
    try {
      const resultOperation = await updateStatusEmployee({id, willIsLocked});
      return resultOperation;
    } catch (e) {
      return false;
    }
  });
};

module.exports = {triggerEventsEmployee};