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
  handleBrowseFile,
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

loadDownloads()
loadClientId()

ipcMain.on("quit", () => app.quit());

ipcMain.handle("get-version", () => {
  return app.getVersion();
})

ipcMain.handle("start-download", (e, ...args) => {
  return handleStartDownload(e, ...args);
})
ipcMain.handle("get-downloads-status", (e, ...args) => {
  return handleGetDownloadsStatus(e, ...args);
})
ipcMain.handle("create-download", (e, ...args) => {
  return handleCreateDownload(e, ...args);
});
ipcMain.handle("resume-download", (e, ...args) => {
  return handleResumeDownload(e, ...args);
});
ipcMain.handle("resume-downloads", (e, ...args) => {
  return handleResumeDownloads(e, ...args);
});
ipcMain.handle("pause-download", (e, ...args) => {
  return handlePauseDownload(e, ...args);
});
ipcMain.handle("pause-downloads", (e, ...args) => {
  return handlePauseDownloads(e, ...args);
})
ipcMain.handle("delete-download", (e, ...args) => {
  return handleDeleteDownload(e, ...args);
});
ipcMain.handle("move-all-downloads", (e, ...args) => {
  return handleMoveAllDownloads(e, ...args);
});

ipcMain.handle("set-setting", (e, ...args) => {
  return handleSetSetting(e, ...args);
});
ipcMain.handle("get-settings", (e, ...args) => {
  return handleGetSettings();
});
ipcMain.handle("set-settings", (e, ...args) => {
  return handleSetSettings(e, ...args);
});
ipcMain.handle("browse", (e, ...args) => {
  return handleBrowse();
});
ipcMain.handle("browse-file", (e, ...args) => {
  return handleBrowseFile();
});
ipcMain.handle("load-beatmaps", (e, ...args) => {
  return handleLoadBeatmaps();
});
ipcMain.handle("get-platform", (e, ...args) => { // Single registration for get-platform
  return handleGetPlatform();
});
ipcMain.handle("get-metrics", (e, ...args) => { // Added back get-metrics
  return handleGetMetrics(e, ...args);
})
ipcMain.handle("get-beatmap-details", (e, ...args) => { // Added back get-beatmap-details
  return handleGetBeatmapDetails(e, ...args);
});

ipcMain.handle("get-temp-data", (e, ...args) => { // Added back get-temp-data
  return handleGetTempData();
});

ipcMain.handle("query", (e, ...args) => {
  return handleQuery(e, ...args);
});
