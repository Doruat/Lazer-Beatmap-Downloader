import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { Browse } from './Browse';
import Button from './util/Button';
import { Tooltip } from './util/Tooltip';

export const Temporary = () => {
  const [tempCount, setTempCount] = useState(0);
  const [tempPath, setTempPath] = useState("");
  const [moving, setMoving] = useState(false);
  const [tempValid, setTempValid] = useState(true);
  const [isWindows, setIsWindows] = useState(true)

  const updateData = () => {
    window.electron.getTempData().then((data) => {
      setTempPath(data.path);
      setTempCount(data.count);
      setTempValid(data.valid)
    });
  };

  useEffect(() => {
    updateData();

    window.electron.getPlatform().then(res => {
      setIsWindows(res === "win32")
    })
  }, []);

  const handleSetTempPath = (path: string) => {
    window.electron.setSetting("tempPath", path).then(() => updateData());
  };

  const handleResetPath = () => {
    window.electron.resetTempPath().then(() => updateData());
  };

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
        <span>You would need to manually import maps using ingame interface.</span>
      </div>
      <div>
        <div className="flex items-center mt-4 gap-2">
          <span className="w-52">Temp Path</span>
          <Browse path={tempPath} update={handleSetTempPath} />
          {!tempValid && (
            <span className="text-red-500">Invalid Path</span>
          )}
        </div>
      </div>
    </div>
  );
};
