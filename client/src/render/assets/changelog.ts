export interface ChangeLogItem {
  version: string;
  date: number;
  changes: {
    title: string;
    changes: string[];
  }[]
}

export const changeLog: ChangeLogItem[] = [
  {
    version: "2.1.1",
    date: 1781552171,
    changes: [
      {
        title: "Client",
        changes: [
          "Fixed some bugs that appeared out of nowhere.",
          "Very likely added some hidden bugs"
        ],
      }
    ]
  },
  {
    version: "2.1.0",
    date: 1778785019,
    changes: [
      {
        title: "Client",
        changes: [
          "Added auto-importing.",
          "'Downloads Folder' and is now *really* mandatory to set to start a download.",
          "Changed the algorithm for searching for beatmaps user already has."
        ],
      }
    ]
  },
  {
    version: "2.0.0",
    date: 1778413287,
    changes: [
      {
        title: "Release",
        changes:[
          "Released v2.0.0"
        ]
      },
      {
        title: "Search",
        changes: [
          "Removed the 'auto-autocomplete' when typing certain letters and making it unable to delete the query."
        ]
      },
      {
        title: "Client",
        changes: [
          "Removed feature to move downloaded files to osu! folder because it wouldn't work with lazer anyway.",
          "Renamed 'Temporary Folder' to 'Downloads Folder' and is now mandatory to set to start a download.",
          "Reimplemented algorithm for lazer to search for beatmaps user already has."
        ],
      }
    ]
  },
  {
    version: "1.3.0",
    date: 1669446685871,
    changes: [
      {
        title: "Server",
        changes: [
          "Added all unranked beatmaps to the database",
          "Improved performance of querying",
          "Fixed unranked map filter",
          "V2 metrics and filter API",
          "Added ranked mapper special filter",
          "Added script to fetch new beatmaps",
          "Added script to update existing beatmap data",
          "Improved security"
        ]
      },
      {
        title: "Search",
        changes: [
          "Added 'Simple Query' mode",
          "Added share filter feature",
          "Renamed farm and stream filters under 'special'",
          "Added ordering when query limit is enabled",
        ]
      },
      {
        title: "Downloads",
        changes: [
          "Added temporary download folder support",
          "Added custom download client",
          "Added support for multiple downloads",
          "Improved download time estimation",
        ]
      },
      {
        title: "Client",
        changes: [
          "Added categories to changelog",
          "Added discord and donation links",
          "Various UI improvements",
        ],
      }
    ]
  },
  {
    version: "1.2.0",
    date: 1654838371361,
    changes: [
      {
        title: "Server",
        changes: [
          "Added tournament maps from 2019-2021 to the database",
          "Moved beatmap storage to Cloudflare R2",
        ],
      },
      {
        title: "Search",
        changes: [
          "Added support for concurrent downloads",
          "Added tournament archetypes to the query selector",
        ],
      },
      {
        title: "Client",
        changes: [
          "Added changelog",
        ],
      }
    ]
  }
]

