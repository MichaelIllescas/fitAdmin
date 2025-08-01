const { app, BrowserWindow } = require('electron')
const path = require('path')
const { spawn } = require('child_process')

let win
let backendProcess

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(app.isPackaged ? process.resourcesPath : __dirname, 'icono.ico'),
    webPreferences: {
      nodeIntegration: false,
    }
  })

  if (app.isPackaged) {
    // Producción: carga el React build
    win.loadFile(path.join(process.resourcesPath, 'app', 'frontend', 'dist', 'index.html'))
  } else {
    // Desarrollo: carga el build local
    win.loadURL(`file://${path.join(__dirname, 'frontend', 'dist', 'index.html')}`)
  }
}

app.whenReady().then(() => {
  const backendPath = app.isPackaged
    ? path.join(process.resourcesPath, 'app', 'backend', 'index.js')
    : path.join(__dirname, 'backend', 'index.js')

  const nodeExec = app.isPackaged
    ? path.join(process.resourcesPath, 'app', 'node', 'node.exe')
    : process.execPath

  console.log('Ejecutando backend desde:', backendPath)

  // 🚀 Levantar backend ocultando la consola negra
  backendProcess = spawn(nodeExec, [backendPath], {
    cwd: app.isPackaged ? path.join(process.resourcesPath, 'app') : __dirname,
    stdio: ['pipe', 'pipe', 'pipe'],
    windowsHide: true // 👈 oculta la consola CMD en Windows
  })

  // Redirigir logs a la consola de Electron
  backendProcess.stdout.on('data', data => {
    console.log(`[BACKEND]: ${data.toString()}`)
  })

  backendProcess.stderr.on('data', data => {
    console.error(`[BACKEND ERROR]: ${data.toString()}`)
  })

  backendProcess.on('close', code => {
    console.log(`[BACKEND CLOSED] Código: ${code}`)
  })

  backendProcess.on('error', err => {
    console.error('Error iniciando backend:', err)
  })

  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (backendProcess) backendProcess.kill()
    app.quit()
  }
})
