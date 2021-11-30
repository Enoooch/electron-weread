const { app, BrowserWindow } = require('electron')
const path = require('path')
const windowStateKeeper = require('electron-window-state')
const { spawn } = require('child_process')
const isDev = process.env.IS_DEV == 'true' ? true : false

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

const addMainWatcher = () => {
  if (isDev) {
    const chokidar = require('chokidar')
    chokidar.watch('./electron/', { persistent: true }).on('change', (event, path) => {
      app.quit()
      spawn('yarn', ['electron'], { stdio: 'inherit' })
    })
  }
}

const createWindow = () => {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 750,
  })

  const win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 375,
    minHeight: 667,
    backgroundColor: '#000',
    frame: false,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
    },
  })

  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../dist/index.html')}`)
  win.on('close', (event) => {
    if (!isAppQuitting) {
      event.preventDefault()
      win.hide()
    }
  })

  win.once('ready-to-show', () => {
    addMainWatcher()
  })

  mainWindowState.manage(win)

  // Open the DevTools.
  isDev && win.openDevTools()
}

app.on('ready', () => {
  createWindow()
})

let isAppQuitting = false
app.on('before-quit', () => {
  isAppQuitting = true
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length === 0) {
    createWindow()
  } else {
    allWindows.forEach((win) => {
      win.show()
    })
  }
})
