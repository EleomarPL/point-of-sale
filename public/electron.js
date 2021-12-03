require('dotenv').config();

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

/*
  require connection events between main and renderer
*/

const {triggerEventsProvider} = require('./electron/evtContextBridge/provider');
const {triggerEventsShopping} = require('./electron/evtContextBridge/shopping');
const {triggerEventsArticle} = require('./electron/evtContextBridge/article');
const {triggerEventsEmployee} = require('./electron/evtContextBridge/employee');
const {triggerEventsSales} = require('./electron/evtContextBridge/sales');
const {triggerEventsAdmin} = require('./electron/evtContextBridge/admin');
const {triggerEventsDebts} = require('./electron/evtContextBridge/debts');
const {triggerEventsLogin} = require('./electron/evtContextBridge/login');

if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    electron: require(path.join(__dirname, '..', 'node_modules', 'electron'))
  });
}
 
Menu.setApplicationMenu(null);

function createWindow() {
  const createMainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      preload: path.join(__dirname, 'electron', 'preload.js')
    }
  });
  createMainWindow.loadURL('http://localhost:3000/');
  // createWindow.loadFile(path.join(__dirname, '../', 'build' , 'index.html'));
  createMainWindow.maximize();

  triggerEventsProvider({windowToSend: createMainWindow});
  triggerEventsShopping({windowToSend: createMainWindow});
  triggerEventsArticle({windowToSend: createMainWindow});
  triggerEventsEmployee({windowToSend: createMainWindow});
  triggerEventsSales({windowToSend: createMainWindow});
  triggerEventsAdmin({windowToSend: createMainWindow});
  triggerEventsDebts({windowToSend: createMainWindow});
  triggerEventsLogin({windowToSend: createMainWindow});
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});