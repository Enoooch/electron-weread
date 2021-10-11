const { app, BrowserView, BrowserWindow } = require('electron')
const path = require('path')

const isDev = process.env.IS_DEV == 'true' ? true : false

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    minWidth: 375,
    minHeight: 667,
    backgroundColor: '#000',
    // darkTheme: true,
    // titleBarStyle: 'hidden',
    // frame: false,
    // show: true,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      nodeIntegration: true,
    },
  })

  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, 'index.html'))
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  )

  // Open the DevTools.
  isDev && mainWindow.openDevTools()

  // createBrowerView(mainWindow)
}

const createBrowerView = win => {
  const { width, height } = win.getBounds()
  const view = new BrowserView()
  win.setBrowserView(view)
  view.setBounds({ x: 0, y: 200, width, height })
  view.setAutoResize({})
  view.webContents.loadURL('https://weread.qq.com/')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
