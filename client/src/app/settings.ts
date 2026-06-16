import settings from "electron-settings";
import fs from 'fs';
import os from 'os';
import path from "path";

export const checkValidPath = async (path: string) => {
  try {
    const files = await fs.promises.readdir(path);
    if (!files.includes("client.realm")) {
      return false;
    }
  } catch(err) {
    return false;
  }

  return true
};

export const checkValidTempPath = async (path: string) => {
  const platform = os.platform();
  if (platform !== "win32") return true;

  const songsPath = await getSongsFolder();

  // check drive letters are the same
  const songsDrive = songsPath.split(":")[0];
  const tempDrive = path.split(":")[0];

  return songsDrive === tempDrive
}

export const getSongsFolder = async () => {
  const osuPath = await settings.get("path") as string;
  return osuPath;
}

export const getTempPath = async () => {
  const tempPath = await settings.get("tempPath") as string
  if (tempPath) return tempPath
  return "";
}

export const getAltPath = async () => {
  const altPath = await settings.get("altPath") as string;
  return altPath ? altPath : "";
}

export const getDownloadPath = async () => {
  return await getTempPath();
};

export const getMaxConcurrentDownloads = async () => {
  return (await settings.get("maxConcurrentDownloads") as number)??3
}
