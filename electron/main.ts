import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 300,              // Ancho fijo
    height: 250,             // Alto mínimo inicial
    minWidth: 300,           // Ancho mínimo
    minHeight: 250,          // Alto mínimo
    maxWidth: 300,           // Ancho máximo (mantener fijo)
    resizable: true,         // Permitir resize vertical
    frame: false,            // Sin bordes del navegador
    alwaysOnTop: false,       // Siempre visible encima de todo
    transparent: true,       // Fondo transparente
    skipTaskbar: false,      // SÍ aparece en la barra de tareas
    icon: path.join(__dirname, '..', 'public', 'stickynotes.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,   // Seguridad
      contextIsolation: true,   // Más seguridad
    },
  })


  // Los listeners de IPC deben estar fuera de createWindow
  // para evitar duplicados al recrear la ventana

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Configurar listeners de IPC
ipcMain.on('resize-window', (_event, width: number, height: number) => {
  if (win) {
    win.setSize(width, height)
  }
})

ipcMain.on('minimize-window', () => {
  if (win) {
    win.minimize()
  }
})

ipcMain.on('close-window', () => {
  if (win) {
    win.close()
  }
})

app.whenReady().then(createWindow)
