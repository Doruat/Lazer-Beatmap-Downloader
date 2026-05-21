import { SettingType } from './../../models/settings';
import settings from "electron-settings";
import { SettingsObject } from "../../global";
import { window } from '../../main'
import { dialog } from "electron";
import { beatmapIds, loadBeatmaps } from "../beatmaps";
import { checkCollections } from "../collection/collection";
import { E } from "./main";
import { checkValidPath, getTempPath } from "../settings";
import fs from 'fs';
import os from 'os';

export const handleGetSettings = async () => {
  const data = await settings.get();
  const path = (data['path'] as string)??"";
  if (path!="") 
    await loadBeatmaps();
  const validPath = Boolean(data['tempPath'] as string)??false;
  return { ...data, validPath, sets: beatmapIds.size };
}

export const handleSetSettings = (event: E, s: SettingsObject) => settings.set(s);
export const handleSetSetting = async <T extends keyof SettingType>(event: E, key: T, value: Parameters<SettingType[T]>[0]) => {
  switch(key) {
    case "darkMode":
      return settings.set("darkMode", value);
    case "maxConcurrentDownloads":
      return settings.set("maxConcurrentDownloads", value);
    case "path":
      return await handleSetPath(value as string);
    case "altPath":
      return await handleSetAltPath(value as string);
    case "altPathEnabled":
      return await handleSetAltPathEnabled(value as boolean);
    case "temp":
      return settings.set("temp", value);
    case "tempPath":
      return await handleSetTempPath(value as string);
    case "autoTemp":
      return settings.set("autoTemp", value);
  }
}

export const handleLoadBeatmaps = loadBeatmaps;
export const handleCheckCollections = checkCollections

export const handleSetPath = async (path: string) => {
  if (!(await checkValidPath(path))) {
    window?.webContents.send("error", "Could not find 'client.realm' file");
    return 0;
  }

  await settings.set("path", path);
  await loadBeatmaps();

  return beatmapIds.size
}

export const handleSetTempPath = async (path: string) => {
  await settings.set("tempPath", path);
  return true
}

export const handleSetAltPath = async (path: string): Promise<number> => {
  await settings.set("altPath", path);
  return beatmapIds.size
}

export const handleSetAltPathEnabled = async (enabled: boolean) => {
  await settings.set("altPathEnabled", enabled);
  return beatmapIds.size;
}

export const handleBrowse = async () => {
  const dialogResult = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  return dialogResult;
}
export const handleBrowseFile = async () => {
  const dialogResult = await dialog.showOpenDialog({
    properties: ["openFile"],
  });
  return dialogResult;
}


export const handleResetTempPath = () => settings.unset("tempPath");
export const handleGetTempData = async () => {
  const tempPath = await getTempPath();
  const tempAuto = await settings.get("autoTemp") as boolean
  const files = tempPath ? await fs.promises.readdir(tempPath) : []
  const valid = true;

  return {
    valid,
    enabled: true,
    path: tempPath,
    auto: tempAuto??false,
    count: files.filter(file => file.endsWith(".osz")).length,
  };
};

export const handleGetPlatform = () => os.platform();
