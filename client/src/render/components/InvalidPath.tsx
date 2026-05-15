import React from "react"

export const InvalidPath = () => {
  return (
    <div className="content-box p-6 flex flex-col dark:text-white w-full">
      <span className="font-bold text-lg">Please set a valid osu! and download path above to use this app. (You'd need to relaunch the app for settings to take place)</span>
    </div>
  )
}
