require('dotenv').config();

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

/*
  require connection events between main and renderer
*/

const { triggerEventsProvider } = require('./electron/evtContextBridge/provider');
const { triggerEventsShopping } = require('./electron/evtContextBridge/shopping');
const { triggerEventsArticle } = require('./electron/evtContextBridge/article');
const { triggerEventsEmployee } = require('./electron/evtContextBridge/employee');
const { triggerEventsSales } = require('./electron/evtContextBridge/sales');
const { triggerEventsAdmin } = require('./electron/evtContextBridge/admin');
const { triggerEventsDebts } = require('./electron/evtContextBridge/debts');
const { triggerEventsLogin } = require('./electron/evtContextBridge/login');
const { triggerEventsInitialOperations } = require('./electron/evtContextBridge/initialOperations');
 
Menu.setApplicationMenu(null);

function createWindow() {
  const createMainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 1200,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      preload: path.join(__dirname, 'electron', 'preload.js')
    }
  });
  //createMainWindow.loadURL('http://localhost:3000/');
  createMainWindow.loadFile(path.join(__dirname, '../', 'build', 'index.html'));
  createMainWindow.maximize();

  /*
    trigger events between the main and the render by passing the main window
  */
  triggerEventsProvider();
  triggerEventsShopping();
  triggerEventsArticle();
  triggerEventsEmployee();
  triggerEventsSales();
  triggerEventsAdmin();
  triggerEventsDebts();
  triggerEventsLogin();
  triggerEventsInitialOperations();
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