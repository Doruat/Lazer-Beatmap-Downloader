import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { useCallback, useState } from "react"
import { Link } from "react-router-dom";
import { MissingMaps } from "../../models/api";
import { bytesToFileSize } from "../util/fileSize";
import Button from "./util/Button";
import { Tooltip } from "./util/Tooltip";

export const FindMissingMaps = () => {
  const [loading, setLoading] = useState(false);
  const [missing, setMissing] = useState<MissingMaps | null>(null)

  const checkCollections = useCallback(async () => {
    setLoading(true);
    setMissing(null);
    const res = await window.electron.checkCollections();
    setMissing(res)
    setLoading(false);
  }, [])

  const download = useCallback(() => {
    window.electron.createDownload(missing?.ids??[], missing?.totalSize??0, false, [], "")
  }, [missing])

  return (
    <div className="content-box flex flex-col gap-4 w-full items-start">
      <span className="font-bold text-lg">Missing Maps</span>
      <span>
        These are beatmaps in your collections that you do not have downloaded.
      </span>
      {!loading ? (
        missing ? (
          missing.ids.length ? (
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-2">
                <span>Beatmap Set Count: {missing.beatmapSetCount}</span>
                <span>Total Size: {bytesToFileSize(missing.totalSize)}</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={download}>Download Missing Maps</Button>
                <Button className="warning" onClick={checkCollections}>Refresh</Button>
              </div>
            </div>
          ) : (
            <span>You have all of your beatmaps downloaded!</span>
          )
        ) : (
          <Button onClick={checkCollections}>Check Collections</Button>
        )
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
