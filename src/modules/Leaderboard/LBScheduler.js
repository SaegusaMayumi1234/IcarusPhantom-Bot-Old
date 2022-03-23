const { scanGuild, getScanStatus } = require('./GuildScanner')
const db = require('../DatabaseManager')
const { getlbUpdateStatus } = require('./LeaderboardUpdater')

let client

let lbSchedulerCache = {
  nextScan: 1636477200000,
  scanned: false
}

db.get("lbScheduler").then(value => {
  if (value === null) {
    db.set("lbScheduler", lbSchedulerCache)
  } else {
    lbSchedulerCache = value
    console.log("Success get database from lbScheduler")
  }
})

function start(clientready) {
  client = clientready
  setInterval(() => {update()}, 1000)
}

function update() {
  let now = new Date().getTime()
  if (lbSchedulerCache.nextScan < now) {
    lbSchedulerCache.nextScan += 86400000
    lbSchedulerCache.scanned = false
    db.set("lbScheduler", lbSchedulerCache)
  }
  if (lbSchedulerCache.nextScan > now && !lbSchedulerCache.scanned) {
    let boolScan = getScanStatus()
    let boolUpdate = getlbUpdateStatus()
    if (boolUpdate.done) {
      lbSchedulerCache.scanned = true
      db.set("lbScheduler", lbSchedulerCache)
      return
    }
    if (!boolScan && !boolUpdate.status) {
      scanGuild(client)
      //lbSchedulerCache.scanned = true
    }
  }
}

exports.start = start;