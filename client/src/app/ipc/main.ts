import { app, ipcMain } from "electron";
import { loadClientId, loadDownloads } from "../download/settings";
import {
  handleCreateDownload,
  handleDeleteDownload,
  handleGetDownloadsStatus,
  handleMoveAllDownloads,
  handlePauseDownload,
  handlePauseDownloads,
  handleResumeDownload,
  handleResumeDownloads,
  handleStartDownload
} from "./downloads";
import {
  handleBrowse,
  handleCheckCollections,
  handleGetPlatform,
  handleGetSettings,
  handleGetTempData,
  handleLoadBeatmaps,
  handleResetTempPath,
  handleSetSetting,
  handleSetSettings,
} from "./settings";
import { handleGetBeatmapDetails, handleGetMetrics, handleQuery } from "./query";

export const serverUri = "https://v2.nzbasic.com";
export type E = Electron.IpcMainInvokeEvent

console.log("Starting loadDownloads...");
loadDownloads()
console.log("Starting loadClientId...");
loadClientId()

ipcMain.on("quit", () => app.quit());

ipcMain.handle("get-version", () => {
  console.log("IPC: get-version");
  return app.getVersion();
})

ipcMain.handle("start-download", (e, ...args) => {
  console.log("IPC: start-download", ...args);
  return handleStartDownload(e, ...args);
})
ipcMain.handle("get-downloads-status", (e, ...args) => {
  console.log("IPC: get-downloads-status");
  return handleGetDownloadsStatus(e, ...args);
})
ipcMain.handle("create-download", (e, ...args) => {
  console.log("IPC: create-download", ...args);
  return handleCreateDownload(e, ...args);
});
ipcMain.handle("resume-download", (e, ...args) => {
  console.log("IPC: resume-download", ...args);
  return handleResumeDownload(e, ...args);
});
ipcMain.handle("resume-downloads", (e, ...args) => {
  console.log("IPC: resume-downloads");
  return handleResumeDownloads(e, ...args);
});
ipcMain.handle("pause-download", (e, ...args) => {
  console.log("IPC: pause-download", ...args);
  return handlePauseDownload(e, ...args);
});
ipcMain.handle("pause-downloads", (e, ...args) => {
  console.log("IPC: pause-downloads");
  return handlePauseDownloads(e, ...args);
})
ipcMain.handle("delete-download", (e, ...args) => {
  console.log("IPC: delete-download", ...args);
  return handleDeleteDownload(e, ...args);
});
ipcMain.handle("move-all-downloads", (e, ...args) => {
  console.log("IPC: move-all-downloads");
  return handleMoveAllDownloads(e, ...args);
});

ipcMain.handle("set-setting", (e, ...args) => {
  console.log("IPC: set-setting", ...args);
  return handleSetSetting(e, ...args);
});
ipcMain.handle("get-settings", (e, ...args) => {
  console.log("IPC: get-settings");
  return handleGetSettings();
});
ipcMain.handle("set-settings", (e, ...args) => {
  console.log("IPC: set-settings", ...args);
  return handleSetSettings(e, ...args);
});
ipcMain.handle("browse", (e, ...args) => {
  console.log("IPC: browse");
  return handleBrowse();
});
ipcMain.handle("load-beatmaps", (e, ...args) => {
  console.log("IPC: load-beatmaps");
  return handleLoadBeatmaps();
});
ipcMain.handle("get-platform", (e, ...args) => { // Single registration for get-platform
  return handleGetPlatform();
});
ipcMain.handle("get-metrics", (e, ...args) => { // Added back get-metrics
  console.log("IPC: get-metrics");
  return handleGetMetrics(e, ...args);
})
ipcMain.handle("get-beatmap-details", (e, ...args) => { // Added back get-beatmap-details
  console.log("IPC: get-beatmap-details", ...args);
  return handleGetBeatmapDetails(e, ...args);
});

ipcMain.handle("get-temp-data", (e, ...args) => { // Added back get-temp-data
  console.log("IPC: get-temp-data");
  return handleGetTempData();
});

ipcMain.handle("query", (e, ...args) => {
  console.log("IPC: query", ...args);
  return handleQuery(e, ...args);
});
