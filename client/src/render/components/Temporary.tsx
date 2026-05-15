import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { Browse } from './Browse';
import Button from './util/Button';
import { Tooltip } from './util/Tooltip';

export const Temporary = () => {
  const [temp, setTemp] = useState(true);
  const [tempCount, setTempCount] = useState(0);
  const [tempPath, setTempPath] = useState("");
  const [tempAuto, setTempAuto] = useState(false);
  const [moving, setMoving] = useState(false);
  const [tempValid, setTempValid] = useState(true);
  const [isWindows, setIsWindows] = useState(true)

  const updateData = () => {
    window.electron.getTempData().then((data) => {
      setTemp(data.enabled);
      setTempPath(data.path);
      setTempCount(data.count);
      setTempValid(data.valid)
      setTempAuto(data.auto);
    });
  };

  useEffect(() => {
    updateData();

    window.electron.getPlatform().then(res => {
      setIsWindows(res === "win32")
    })
  }, []);

  const handleToggle = () => {
    window.electron.setSetting("temp", !temp).then(() => updateData());
  };

  const handleSetTempPath = (path: string) => {
    window.electron.setSetting("tempPath", path).then(() => updateData());
  };

  const handleResetPath = () => {
    window.electron.resetTempPath().then(() => updateData());
  };

  const handleSetTempAuto = (auto: boolean) => {
    window.electron.setSetting("autoTemp", auto).then(() => updateData());
  }

  const handleMoveDownloads = () => {
    setMoving(true)
    window.electron.moveTempDownloads().then(() => {
      updateData();
      setMoving(false);
    });
  };

  return (
    <div className="content-box flex flex-col items-start gap-6">
      <h1 className="font-bold text-lg">Downloads Folder</h1>
      <div className="flex flex-col">
        <span>All beatmap downloads are downloaded to this folder.</span>
      </div>
        <div className="flex items-center mt-4 gap-2">
          <span className="w-52">Download Path</span>
          <Browse path={tempPath} update={handleSetTempPath} />
        </div>
        <div className="flex items-center mt-4 gap-2">
          <span className="w-52">
            Auto Import
            <Tooltip title="Automatically import downloads from the donwloads folder when downloads are finished. THIS WILL LAUNCH OSU! IN PROCESS" />
          </span>
          <Switch checked={tempAuto} onChange={handleSetTempAuto} />
        </div>
      <Button disabled={tempCount === 0 || moving} onClick={handleMoveDownloads}>Launch osu! and import beatmaps</Button>
    </div>
  );
};
