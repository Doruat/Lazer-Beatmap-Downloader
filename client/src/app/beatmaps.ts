import fs from "fs";
import { getSongsFolder } from "./settings";
import { readdir, open } from "fs/promises";
import path from "path";
import { window } from "../main";

export let beatmapIds: Set<number> = new Set();

export const getAllFiles = async (dir: string): Promise<string[]> => {
  const results: string[] = [];

  const walk = async (currentDir: string) => {
    const entries = await readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else {
        results.push(fullPath);
      }
    }
  };

  await walk(dir);
  return results;
};

export const extractBeatmapSetID = async (
  filePath: string
): Promise<number | null> => {
  let fd;
  try {
    // Only read the first 8KB - metadata is always at the top
    const buffer = Buffer.alloc(8192);
    fd = await fs.promises.open(filePath, "r");
    const { bytesRead } = await fd.read(buffer, 0, 8192, 0);
    const content = buffer.toString("utf8", 0, bytesRead);

    if (!content.startsWith("osu file format")) {
      return null;
    }

    const match = content.match(/^BeatmapSetID:\s*(\d+)/m);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  } finally {
    if (fd) await fd.close();
  }
};

export const loadBeatmaps = async () => {
  setTimeout(async () => {
    const root = await getSongsFolder()
    const files = await getAllFiles(root);
    const ids: number[] = [];

    for (const file of files) {
      try {
        const id = await extractBeatmapSetID(file);
        if (id !== null) {
          ids.push(id);
          if (new Set(ids).size != beatmapIds.size)
            {beatmapIds = new Set(ids);
            if (!(beatmapIds.size % 10)) 
              window?.webContents.send("beatmap-count", beatmapIds.size)}

        }
      } catch {
        // ignore unreadable files
      }
    }
    // Final update to ensure the last few are counted
    window?.webContents.send("beatmap-count", beatmapIds.size);
    window?.webContents.send("beatmap-scan-complete");
  }, 0);
};