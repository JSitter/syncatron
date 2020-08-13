// Temporary Dev Dependency
require('dotenv').config()

const electron = require("electron");
var SFTPClient = require('sftp-promises');
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
  console.log("host", process.env.host);
  console.log(sftp)
  sftp.ls('public_html').then(function(list) { console.log("list", list) }).catch((err) => console.log("err", err))
}


function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680, webPreferences: { nodeIntegration: true }});
  secureConnect(process.env.host, process.env.username, process.env.password);
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
