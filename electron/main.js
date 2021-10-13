const { app, BrowserWindow } = require('electron')
const path = require('path')
const Store = require('electron-store')

const store = new Store()
const isDev = process.env.IS_DEV == 'true' ? true : false

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

const createWindow = () => {
  let windowWidth = 1000
  let windowHeight = 750
  const windowSize = store.get('window-size')
  if (windowSize) {
    windowWidth = windowSize.width
    windowHeight = windowSize.height
  }

  const win = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    minWidth: 375,
    minHeight: 667,
    backgroundColor: '#000',
    frame: false,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      nodeIntegration: true,
    },
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  )
  win.on('will-resize', (event, newBounds) => {
    store.set('window-size', {
      width: newBounds.width,
      height: newBounds.height,
    })
  })
  win.on('close', (event) => {
    if (!isAppQuitting) {
      event.preventDefault()
      win.hide()
    }
  })
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
    allWindows.forEach(win => {
      win.show()
    })
  }
})
