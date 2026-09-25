using Realms;
using osu.Game.Beatmaps;
using System.IO;
using System;
using System.Linq;

var path = Path.GetFullPath(args[0]);
ulong sv = 51;
while (true)
{
    var config = new RealmConfiguration(path)
    {
        SchemaVersion = sv
    };
    try
    {
        var realm = Realm.GetInstance(config);
        var bms = realm.All<BeatmapSetInfo>().AsEnumerable();
        foreach (var bm in bms)
        {
            Console.Write(bm.OnlineID + " ");
        }
        break;
    }
    catch
    {
        sv++;
    }
}
