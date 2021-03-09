const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 1300,
    height: 900,
    // frame: false,
    // transparent: false,
    // titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL('http://localhost:3000')
  win.setMenuBarVisibility(false)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})