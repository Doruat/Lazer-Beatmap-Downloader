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
  await loadBeatmaps();
  const data = await settings.get();
  const path = (data['path'] as string)??"";
  const validPath = Boolean(await checkValidPath(path) && ((data['tempPath'] as string)?.length??false));
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
      await settings.set("tempPath", value)
      const data = await settings.get();
      await handleSetValid((Boolean((await checkValidPath(data["path"] as  string) && ((data['tempPath'] as string)?.length))??false)));
      return;
    case "autoTemp":
      return settings.set("autoTemp", value);
  }
}

export const handleLoadBeatmaps = loadBeatmaps;
export const handleCheckCollections = checkCollections

export const handleSetPath = async (path: string) => {
  const data = await settings.get();
  const validPath = (await checkValidPath(path) && ((data['tempPath'] as string)?.length??false));
  if (!(await checkValidPath(path))) {
    window?.webContents.send("error", "Could not find 'client.realm' file");
    return [false, 0];
  }

  await settings.set("path", path);
  await loadBeatmaps();

  return [validPath, beatmapIds.size]
}

export const handleSetAltPath = async (path: string): Promise<number> => {
  await settings.set("altPath", path);
  await loadBeatmaps();
  return beatmapIds.size
}

export const handleSetAltPathEnabled = async (enabled: boolean) => {
  await settings.set("altPathEnabled", enabled);
  await loadBeatmaps();
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

export const handleSetValid = async (val: boolean): Promise<boolean> => {
  await settings.set("validPath",val);
  return val;
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
