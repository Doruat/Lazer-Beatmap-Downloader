using Realms;
using Newtonsoft.Json;
using osu.Game.Beatmaps;
using System.IO;

var path = Path.GetFullPath(args[0]);

var config = new RealmConfiguration(path)
{
    SchemaVersion = 51
};

try 
{
    var realm = Realm.GetInstance(config);
    var bms = realm.All<BeatmapSetInfo>().AsEnumerable();
    foreach (var bm in bms)
    {
        Console.Write(bm.OnlineID + " ");
    } 
}
catch
{
}