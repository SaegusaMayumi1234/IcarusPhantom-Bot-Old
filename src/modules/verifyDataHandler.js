const db = require('../modules/DatabaseManager')

var verifyDataCache = [
  {
    "username": "none",
    "uuid": "none",
    "shiguild": false,
    "discordtag": "none",
    "discordid": "none",
    "forced": true,
    "discordtagcache": [],
    "discordidcache": []
  }
]

db.get("verifyData").then(value => {
  if (value === null) {
    db.set("verifyData", verifyDataCache)
  } else if (value !== null) {
    verifyDataCache = value
  }
});

function get() {
  return verifyDataCache
}

function save(datacache) {
  let alreadyexist = false
  for (let i = 0; i < verifyDataCache.length; i++) {
    if (datacache.uuid == verifyDataCache[i].uuid) {
      alreadyexist = true
      if (!verifyDataCache[i].discordidcache.includes(datacache.discordid)) {
        verifyDataCache[i].discordidcache.push(datacache.discordid)
      }
      if (!verifyDataCache[i].discordtagcache.includes(datacache.discordtag)) {
        verifyDataCache[i].discordtagcache.push(datacache.discordtag)
      }
      verifyDataCache[i].username = datacache.username
      verifyDataCache[i].shiguild = datacache.shiguild
      verifyDataCache[i].discordtag = datacache.discordtag
      verifyDataCache[i].discordid = datacache.discordid
      verifyDataCache[i].forced = datacache.forced
      db.set("verifyData", verifyDataCache)
    }
  }
  if (!alreadyexist) {
    datacache.discordidcache.push(datacache.discordid)
    datacache.discordtagcache.push(datacache.discordtag)
    verifyDataCache.push(datacache)
    db.set("verifyData", verifyDataCache)
  }
}

exports.get = get;
exports.save = save;