const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
  'api_here', {}
);