const { app, BrowserWindow, Menu } = require('electron');
 
Menu.setApplicationMenu(null);

function createWindow() {
  const createWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true
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