import fs from "fs";
import { getSongsFolder } from "./settings";
import { readdir, open } from "fs/promises";
import path from "path";
import { window } from "../main";
import { exec, execFile, execFileSync } from "child_process";
import { error } from "console";
import { stderr, stdout } from "process";
import { app } from "electron";

export let beatmapIds: Set<number> = new Set();

const realmreader =
  process.platform === "win32"
    ? path.join("bin","realmreader.exe")
    : path.join("bin","realmreader");

const rrpath = app.isPackaged
  ? path.join(process.resourcesPath, realmreader)
  : path.join(__dirname, "../..", realmreader);

const run = (path: string): number[] => {
  const stdout = execFileSync(rrpath, [path], { encoding: "utf-8" });

  const ids: number[] = [];
  const out = stdout.split(" ");
  
  for (const id of out) {
    if (Number(id) > 0) ids.push(Number(id));
  }

  return ids;
}

export const loadBeatmaps = async () => {

  const clientpath = (await getSongsFolder());

  const files = await fs.promises.readdir(clientpath);
  if (!files.includes("client.realm"))
  {
    beatmapIds=new Set();
    window?.webContents.send("beatmap-count", 0);
    window?.webContents.send("beatmap-scan-complete");
    return;
  }

  const ids: number[] = run(path.join(clientpath,"client.realm"));
  beatmapIds=new Set(ids);
  window?.webContents.send("beatmap-count", beatmapIds.size);
  window?.webContents.send("beatmap-scan-complete");

};
