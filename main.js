const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const backend = require('./backend/fitadmin-backend')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(app.isPackaged ? process.resourcesPath : __dirname, 'icono.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(app.isPackaged ? process.resourcesPath : __dirname, 'preload.js')
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

app.whenReady().then(async () => {
  await backend.initDatabase()

  ipcMain.handle('members:list', () => backend.members.list())
  ipcMain.handle('members:register', (_, data) => backend.members.register(data))
  ipcMain.handle('members:update', (_, payload) => backend.members.update(payload.id, payload.data))
  ipcMain.handle('members:delete', (_, id) => backend.members.delete(id))
  ipcMain.handle('members:search', (_, query) => backend.members.search(query))

  ipcMain.handle('feeTypes:register', (_, data) => backend.feeTypes.register(data))
  ipcMain.handle('feeTypes:list', () => backend.feeTypes.list())
  ipcMain.handle('feeTypes:update', (_, payload) => backend.feeTypes.update(payload.id, payload.data))
  ipcMain.handle('feeTypes:delete', (_, id) => backend.feeTypes.delete(id))

  ipcMain.handle('assistances:register', (_, data) => backend.assistances.register(data))
  ipcMain.handle('assistances:list', () => backend.assistances.list())
  ipcMain.handle('assistances:byMember', (_, id) => backend.assistances.byMember(id))
  ipcMain.handle('assistances:delete', (_, id) => backend.assistances.delete(id))
  ipcMain.handle('assistances:update', (_, payload) => backend.assistances.update(payload.id, payload.data))
  ipcMain.handle('assistances:annul', (_, id) => backend.assistances.annul(id))
  ipcMain.handle('assistances:byDate', (_, date) => backend.assistances.byDate(date))

  ipcMain.handle('payments:searchMember', (_, query) => backend.payments.searchMember(query))
  ipcMain.handle('payments:register', (_, data) => backend.payments.register(data))
  ipcMain.handle('payments:list', () => backend.payments.list())
  ipcMain.handle('payments:delete', (_, id) => backend.payments.delete(id))
  ipcMain.handle('payments:update', (_, payload) => backend.payments.update(payload.id, payload.data))
  ipcMain.handle('payments:search', (_, query) => backend.payments.search(query))

  ipcMain.handle('expenses:register', (_, data) => backend.expenses.register(data))
  ipcMain.handle('expenses:list', () => backend.expenses.list())
  ipcMain.handle('expenses:getById', (_, id) => backend.expenses.getById(id))
  ipcMain.handle('expenses:update', (_, payload) => backend.expenses.update(payload.id, payload.data))
  ipcMain.handle('expenses:delete', (_, id) => backend.expenses.delete(id))

  ipcMain.handle('reports:dailyIncome', (_, date) => backend.reports.dailyIncome(date))
  ipcMain.handle('reports:monthlyIncomes', (_, year) => backend.reports.monthlyIncomes(year))
  ipcMain.handle('reports:monthlyExpenses', (_, year) => backend.reports.monthlyExpenses(year))
  ipcMain.handle('reports:annualProfit', () => backend.reports.annualProfit())
  ipcMain.handle('reports:monthly', (_, year) => backend.reports.monthly(year))

  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
