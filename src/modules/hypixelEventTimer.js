const fetchData = require('../utils/fetchData')
const db = require('./DatabaseManager')

var eventTimer = {
  "magma": 0,
  "darkauction": 0,
  "winter": 0,
  "spooky": 0,
  "spookyFishing": 0,
  "bank": 0,
  "newyear": 0,
  "zoo": 0,
  "jerryWorkshop": 0,
  "seasonOfJerry": 0
}

db.get("eventTimer").then(value => {
  if (value === null) {
    db.set("eventTimer", eventTimer)
  } else {
    eventTimer = value
  }
})

const baseURL = 'https://hypixel-api.inventivetalent.org/api/skyblock/'
const parameter = ["bosstimer/magma/estimatedSpawn", "darkauction/estimate", "winter/estimate", "spookyFestival/estimate", "bank/interest/estimate", "newyear/estimate", "zoo/estimate", "jerryWorkshop/estimate"]

async function start() {
  for (const item of parameter) {
    const data = await fetchData(baseURL + item)
    if (data.status == 200) {
      if (item.includes('magma')) {
        eventTimer.magma = data.data.estimate
      } else if (item.includes('darkauction')) {
        eventTimer.darkauction = data.data.estimate
      } else if (item.includes('winter')) {
        eventTimer.winter = data.data.estimate
      } else if (item.includes('spookyFestival')) {
        eventTimer.spooky = data.data.estimate
        eventTimer.spookyFishing = data.data.estimate - 3600000
      } else if (item.includes('bank')) {
        eventTimer.bank = data.data.estimate
      } else if (item.includes('newyear')) {
        eventTimer.newyear = data.data.estimate
      } else if (item.includes('zoo')) {
        eventTimer.zoo = data.data.estimate
      } else if (item.includes('jerryWorkshop')) {
        eventTimer.jerryWorkshop = data.data.estimate
        eventTimer.seasonOfJerry = data.data.estimate + 28800000
      }
    }
  }
  save()
  setTimeout(() => {
    start()
  }, 60 * 1000)
}

function save() {
  db.set("eventTimer", eventTimer).then(() => {});
}

function get() {
  return eventTimer
}

exports.start = start;
exports.get = get;