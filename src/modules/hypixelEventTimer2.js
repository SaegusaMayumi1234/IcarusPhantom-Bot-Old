const db = require("./DatabaseManager")

var eventTimer = {
  'election-booth': {
    open: {
      at: 1632363300000,
      election: 75,
      special: 1635041700000,
      specialelection: 81
    },
    close: {
      at: 1632698100000,
      election: 75,
      special: 1635376500000,
      specialelection: 81
    }
  },
  'travelling-zoo': {
    summer: { start: 1632704100000, end: 1632707700000, pets: 'Elephant' },
    winter: { start: 1632480900000, end: 1632484500000, pets: 'Monkey' }
  },
  "jerry's-workshop": {
    'winter-island': { start: 1632555300000, end: 1632592500000 },
    'season-of-jerry': { start: 1632582900000, end: 1632586500000, season: 130 }
  },
  'spooky-festival': {
    fishing: { start: 1632436500000, end: 1632447300000 },
    event: { start: 1632440100000, end: 1632443700000, festival: 144 }
  },
  'new-year-celebration': { start: 1632588900000, end: 1632592500000, celebration: 162 },
  bankinterest: { start: 1632369300000 },
  experimenttable: { start: 1632355200000 },
  commissions: { start: 1632286800000 },
  fetchur: { start: 1632286800000 },
  jacob: { start: 1632280500000, end: 1632281700000 },
  darkauction: { start: 1632279300000 },
  fishingFestival: {
    active: false,
    type: 'normal',
    normal: { start: 1632294900000, end: 1632298500000, at: 2 },
    extra: { start: 1630571700000, end: 1630590300000, at: 1 }
  },
  miningFestival: {
    active: false,
    type: 'extra',
    normal: {
      at: "1",
      "1": {
        start: 1632257700000,
        end: 1632276300000
      },
      "2": {
        start: 1632369300000,
        end: 1632387900000
      },
    },
    extra: { start: 1632357300000, end: 1632375900000, at: 1 }
  }
}

//mining timer
//1632257700000 (start 1)
//1632276300000 (end 1)
//1632369300000 (start 2)
//1632387900000 (end 2)

//db.del("eventTimer2")
//db.set("eventTimer2", eventTimer)

db.get("eventTimer2").then(value => {
  //console.log(value)
  if (value === null) {
    db.set("eventTimer2", eventTimer)
  } else {
    eventTimer = value
    console.log("Success get database from eventTimer2")
  }
  setInterval(() => {update()}, 1000)
})

//446400 seconds (5day4hours)
//446400000 miliseconds (5day4hours)
//3600 seconds (1hour)
//3600000 miliseconds (1hour)
//1,628,984,100,000
//1629690900000 fishing event
// 10h 20m = 37200000


function update() {
  const now = new Date().getTime()
  let change = false
  if ((eventTimer["election-booth"].open.at - now) < 0) {
    eventTimer["election-booth"].open.at += 446400000
    eventTimer["election-booth"].open.election += 1
    change = true
  }
  if ((eventTimer["election-booth"].open.special - now) < 0) {
    eventTimer["election-booth"].open.special += 3571200000
    eventTimer["election-booth"].open.specialelection += 8
    change = true
  }
  if ((eventTimer["election-booth"].close.at - now) < 0) {
    eventTimer["election-booth"].close.at += 446400000
    eventTimer["election-booth"].close.election += 1
    change = true
  }
  if ((eventTimer["election-booth"].close.special - now) < 0) {
    eventTimer["election-booth"].close.special += 3571200000
    eventTimer["election-booth"].close.specialelection += 8
    change = true
  }
  if ((eventTimer["travelling-zoo"].summer.start - now) < 0) {
    eventTimer["travelling-zoo"].summer.start += 446400000
    change = true
  }
  if ((eventTimer["travelling-zoo"].summer.end - now) < 0) {
    eventTimer["travelling-zoo"].summer.end += 446400000
    if (eventTimer["travelling-zoo"].summer.pets === "Elephant") {
      eventTimer["travelling-zoo"].summer.pets = "Blue Whale"
    } else if (eventTimer["travelling-zoo"].summer.pets === "Blue Whale") {
      eventTimer["travelling-zoo"].summer.pets = "Lion"
    } else if (eventTimer["travelling-zoo"].summer.pets === "Lion") {
      eventTimer["travelling-zoo"].summer.pets = "Elephant"
    }
    change = true
  }
  if ((eventTimer["travelling-zoo"].winter.start - now) < 0) {
    eventTimer["travelling-zoo"].winter.start += 446400000
    change = true
  }
  if ((eventTimer["travelling-zoo"].winter.end - now) < 0) {
    eventTimer["travelling-zoo"].winter.end += 446400000
    if (eventTimer["travelling-zoo"].winter.pets === "Giraffe") {
      eventTimer["travelling-zoo"].winter.pets = "Tiger"
    } else if (eventTimer["travelling-zoo"].winter.pets === "Tiger") {
      eventTimer["travelling-zoo"].winter.pets = "Monkey"
    } else if (eventTimer["travelling-zoo"].winter.pets === "Monkey") {
      eventTimer["travelling-zoo"].winter.pets = "Giraffe"
    }
    change = true
  }
  if ((eventTimer["jerry's-workshop"]["winter-island"].start - now) < 0) {
    eventTimer["jerry's-workshop"]["winter-island"].start += 446400000
    change = true
  }
  if ((eventTimer["jerry's-workshop"]["winter-island"].end - now) < 0) {
    eventTimer["jerry's-workshop"]["winter-island"].end += 446400000
    change = true
  }
  if ((eventTimer["jerry's-workshop"]["season-of-jerry"].start - now) < 0) {
    eventTimer["jerry's-workshop"]["season-of-jerry"].start += 446400000
    change = true
  }
  if ((eventTimer["jerry's-workshop"]["season-of-jerry"].end - now) < 0) {
    eventTimer["jerry's-workshop"]["season-of-jerry"].end += 446400000
    eventTimer["jerry's-workshop"]["season-of-jerry"].season += 1
    change = true
  }
  if ((eventTimer["spooky-festival"].fishing.start - now) < 0) {
    eventTimer["spooky-festival"].fishing.start += 446400000
    change = true
  }
  if ((eventTimer["spooky-festival"].fishing.end - now) < 0) {
    eventTimer["spooky-festival"].fishing.end += 446400000
    change = true
  }
  if ((eventTimer["spooky-festival"].event.start - now) < 0) {
    eventTimer["spooky-festival"].event.start += 446400000
    change = true
  }
  if ((eventTimer["spooky-festival"].event.end - now) < 0) {
    eventTimer["spooky-festival"].event.end += 446400000
    eventTimer["spooky-festival"].event.festival += 1
    change = true
  }
  if ((eventTimer["new-year-celebration"].start - now) < 0) {
    eventTimer["new-year-celebration"].start += 446400000
    change = true
  }
  if ((eventTimer["new-year-celebration"].end - now) < 0) {
    eventTimer["new-year-celebration"].end += 446400000
    eventTimer["new-year-celebration"].celebration += 1
    change = true
  }
  if ((eventTimer.bankinterest.start - now) < 0) {
    eventTimer.bankinterest.start += 111600000
    change = true
  }
  if ((eventTimer.experimenttable.start - now) < 0) {
    eventTimer.experimenttable.start += 86400000
    change = true
  }
  if ((eventTimer.commissions.start - now) < 0) {
    eventTimer.commissions.start += 86400000
    change = true
  }
  if ((eventTimer.fetchur.start - now) < 0) {
    eventTimer.fetchur.start += 86400000
    change = true
  }
  if ((eventTimer.jacob.start - now) < 0) {
    eventTimer.jacob.start += 3600000
    change = true
  }
  if ((eventTimer.jacob.end - now) < 0) {
    eventTimer.jacob.end += 3600000
    change = true
  }
  if ((eventTimer.darkauction.start - now) < 0) {
    eventTimer.darkauction.start += 3600000
    change = true
  }
  if ((eventTimer.fishingFestival.normal.start - now) < 0) {
    eventTimer.fishingFestival.normal.start += 37200000
    change = true
  }
  if ((eventTimer.fishingFestival.normal.end - now) < 0) {
    eventTimer.fishingFestival.normal.end += 37200000
    if (eventTimer.fishingFestival.normal.at == 12) {
      eventTimer.fishingFestival.normal.at = 1
      eventTimer.fishingFestival.active = false
    } else {
      eventTimer.fishingFestival.normal.at += 1
    }
    change = true
  }
  if ((eventTimer.miningFestival.extra.start - now) < 0) {
    eventTimer.miningFestival.extra.start += 446400000
    change = true
  }
  if ((eventTimer.miningFestival.extra.end - now) < 0) {
    eventTimer.miningFestival.extra.end += 446400000
    eventTimer.miningFestival.active = false
    change = true
  }
  if ((eventTimer.miningFestival.normal["1"].start - now) < 0) {
    eventTimer.miningFestival.normal["1"].start += 446400000
    change = true
  }
  if ((eventTimer.miningFestival.normal["1"].end - now) < 0) {
    eventTimer.miningFestival.normal["1"].end += 446400000
    eventTimer.miningFestival.normal.at = "2"
    change = true
  }
  if ((eventTimer.miningFestival.normal["2"].start - now) < 0) {
    eventTimer.miningFestival.normal["2"].start += 446400000
    change = true
  }
  if ((eventTimer.miningFestival.normal["2"].end - now) < 0) {
    eventTimer.miningFestival.normal["2"].end += 446400000
    eventTimer.miningFestival.normal.at = "1"
    eventTimer.miningFestival.active = false
    change = true
  }
  if (change) {
    db.set("eventTimer2", eventTimer)
  }
}

function get() {
  return eventTimer
}

function changeActive(event, type, statement) {
  if (event === "FishingFestival") {
    eventTimer.fishingFestival.active = statement
    eventTimer.fishingFestival.type = type
  } else if (event === "MiningFestival") {
    eventTimer.miningFestival.active = statement
    eventTimer.miningFestival.type = type
  }
  db.set("eventTimer2", eventTimer)
}

const pets = [
  "Elephant",
  "Giraffe",
  "Blue Whale",
  "Tiger",
  "Lion",
  "Monkey"
]

exports.get = get;
exports.changeActive = changeActive;