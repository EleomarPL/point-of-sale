const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
  'electron', {
    provider: {

    },
    shopping: {

    },
    article: {

    },
    employee: {

    },
    sales: {

    },
    debts: {
      
    }
  }
);