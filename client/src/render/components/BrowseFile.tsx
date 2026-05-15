import Button from "../components/util/Button";
import React from "react";
import { toast } from "react-toastify";

interface PropTypes {
  path: string
  update: (path: string) => void
}

export const Browsefile = ({ path, update }: PropTypes) => {
  const browsefile = async () => {
    const res = await window.electron.browsefile();
    if (!res.canceled) {
      const path = res.filePaths[0]
      toast.success(`Path updated!`)
      update(path);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        value={path}
        disabled={true}
        className="input-height p-2 w-40 border-gray-300 border rounded focus:outline-blue-500"
      />
      <Button color="blue" onClick={() => browsefile()}>Browse</Button>
    </div>
  )
}
