const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    electron: require(path.join(__dirname, '..', 'node_modules', 'electron'))
  });
}
 
Menu.setApplicationMenu(null);

function createWindow() {
  const createWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      preload: path.join(__dirname, 'electron', 'preload.js')
    }
  });
  createWindow.loadURL('http://localhost:3000/');
  createWindow.maximize();
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