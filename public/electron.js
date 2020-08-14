const keytar = require('keytar');
const electron = require('electron');
const {ipcMain} = require('electron');
const SFTPClient = require('sftp-promises');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

require("update-electron-app")({
  repo: "jsitter/syncatron",
  updateInterval: "12 hour"
});

function secureConnect(host, username, password) {
  const config = {host, username, password};
  var sftp = new SFTPClient(config);
  console.log(sftp)
  sftp.ls('public_html').then(function(list) { console.log("list", list) }).catch((err) => console.log("err", err))
}

function getSavedConnections() {
  return keytar.findCredentials('Syncatron')
}

function saveConnection(event, hostname, username, password) {
  keytar.setPassword('Syncatron', username + '@' + hostname, password)
    .then(()=>{
      event.reply('host-save-complete', 'complete');
    }).catch(err=>console.log(err));
}

ipcMain.on('get-hosts', (event, arg) => {
  getSavedConnections().then((values)=>{
    event.reply('host-list', values);
  })
});

ipcMain.on('save-host', (event, creds) => {
  saveConnection(event, creds.hostname, creds.username, creds.password);
});

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680, webPreferences: { nodeIntegration: true }});
  // secureConnect(process.env.host, process.env.username, process.env.password);
  
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  console.log(process.platform)
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
