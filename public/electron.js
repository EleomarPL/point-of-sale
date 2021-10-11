require('dotenv').config();

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const {triggerEventsProvider} = require('./electron/evtContextBridge/provider');

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
  createMainWindow.maximize();

  triggerEventsProvider({windowToSend: createMainWindow});
  // createWindow.loadFile(path.join(__dirname, '../', 'build' , 'index.html'));
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