const { app, BrowserView, BrowserWindow } = require('electron')
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

  const mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
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

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  )

  // Open the DevTools.
  isDev && mainWindow.openDevTools()

  mainWindow.on('will-resize', (event, newBounds) => {
    store.set('window-size', {
      width: newBounds.width,
      height: newBounds.height,
    })
  })

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

app.on('ready', () => {
  createWindow()
})

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
