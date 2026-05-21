const path = require("path");
const package = require("../package.json");
require("dotenv").config();

const packageAssetsPath = path.join(__dirname, "..", "src", "render", "assets");


module.exports = {
  packagerConfig: {
    extraResource: [
      "./bin/realmreader"
    ],
    asar: true,
    icon: path.join(packageAssetsPath, "bbd.ico"),
    executableName: "lazer-beatmap-downloader",
  },
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "Doruat",
          name: "lazer-beatmap-downloader",
          authToken: process.env.GITHUB_TOKEN,
        },
        draft: true,
      },
    },
  ],
  makers: [
    // https://www.electronforge.io/config/makers
      {
      name: "@electron-forge/maker-appimage",
      config: {
        options: {
        icon: path.join(packageAssetsPath, "bbd.ico"),
          categories: ["Utility"]
        }
      }
    },
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        // https://js.electronforge.io/maker/squirrel/interfaces/makersquirrelconfig
        setupExe: "LBDWindowsSetup.exe",
        setupIcon: path.join(packageAssetsPath, "bbd.ico"),
        icon: path.join(packageAssetsPath, "bbd.ico"),
        iconUrl:
          "https://raw.githubusercontent.com/nzbasic/batch-beatmap-downloader/0d3d2a2f6754e0ba95f8470e71b82c579e0c5ee2/client/src/bbd.ico",
        authors: "Doruat",

      },
    },
    // You can only build the DMG target on macOS machines.
    {
      name: "@electron-forge/maker-dmg",
      config: {
        // https://js.electronforge.io/maker/dmg/interfaces/makerdmgconfig
        icon: path.join(packageAssetsPath, "bbd.png"),
        overwrite: true,
        name: "Lazer Beatmap Downloader", // NEEDS TO BE SHORTER THAN 27 CHARACTERS
      },
    },

    // Use maker-zip to build for mac, but without customizability
    // {
    //   name: "@electron-forge/maker-zip",
    //   platforms: ["darwin"],
    //   // No config choice
    // },

    {
      name: "@electron-forge/maker-deb",
      config: {
        // https://js.electronforge.io/maker/deb/interfaces/makerdebconfig
        icon: path.join(packageAssetsPath, "bbd.png"),
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        mainConfig: "./.config/webpack.main.config.js",
        renderer: {
          config: "./.config/webpack.renderer.config.js",
          devContentSecurityPolicy: `default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';`,
          port: 3000,
          entryPoints: [
            {
              html: "./src/render/index.html",
              js: "./src/renderer.tsx",
              name: "main_window",
              preload: {
                js: "./src/preload.ts",
              },
            },
          ],
        },
      },
    },
  ],
};
