const db = require("./DatabaseManager")

var eventTimer = {
  "election-booth": {
    "open": {
      "at": 1628345700000,
      "election": 66,
      "special": 1631470500000,
      "specialelection": 73
    },
    "close": {
      "at": 1628234100000,
      "election": 65,
      "special": 1628234100000,
      "specialelection": 65
    }
  },
  "travelling-zoo": {
    "summer": {
      "start": 1628240100000,
      "end": 1628243700000,
      "pets": `Lion`
    },
    "winter": {
      "start": 1628463300000,
      "end": 1628466900000,
      "pets": `Monkey`
    }
  },
  "jerry's-workshop": {
    "winter-island": {
      "start": 1628537700000,
      "end": 1628573700000
    },
    "season-of-jerry": {
      "start": 1628565300000,
      "end": 1628568900000,
      "season": 121
    }
  },
  "spooky-festival": {
    "fishing": {
      "start": 1628418900000,
      "end": 1628429700000
    },
    "event": {
      "start": 1628422500000,
      "end": 1628426100000,
      "festival": 135
    }
  },
  "new-year-celebration": {
    "start": 1628571300000,
    "end": 1628574900000,
    "celebration": 153
  },
  "bankinterest": {
    "start": 1628240100000
  },
  "experimenttable": {
    "start": 1628208000000
  },
  "commissions": {
    "start": 1628226000000
  },
  "fetchur": {
    "start": 1628226000000
  },
  "jacob": {
    "start": 1628176500000,
    "end": 1628177700000
  },
  "darkauction": {
    "start": 1628178900000
  }
}

//db.del("eventTimer2")

db.get("eventTimer2").then(value => {
  console.log(value)
  if (value === null) {
    db.set("eventTimer2", eventTimer)
  } else {
    eventTimer = value
  }
  setInterval(() => {update()}, 1000)
})

//446400 seconds (5day4hours)
//446400000 miliseconds (5day4hours)
//3600 seconds (1hour)
//3600000 miliseconds (1hour)
//1,628,984,100,000
//


function update() {
  const now = new Date().getTime()
  const oldeventTimer = eventTimer
  if ((eventTimer["election-booth"].open.at - now) < 0) {
    eventTimer["election-booth"].open.at += 446400000
    eventTimer["election-booth"].open.election += 1
  }
  if ((eventTimer["election-booth"].open.special - now) < 0) {
    eventTimer["election-booth"].open.special += 3571200000
    eventTimer["election-booth"].open.specialelection += ((eventTimer["election-booth"].open.special - eventTimer["election-booth"].open.at) / 446400000)
  }
  if ((eventTimer["election-booth"].close.at - now) < 0) {
    eventTimer["election-booth"].close.at += 446400000
    eventTimer["election-booth"].close.election += 1
  }
  if ((eventTimer["election-booth"].close.special - now) < 0) {
    eventTimer["election-booth"].close.special += 3571200000
    eventTimer["election-booth"].close.specialelection += ((eventTimer["election-booth"].close.special - eventTimer["election-booth"].close.at) / 446400000)
  }
  if ((eventTimer["travelling-zoo"].summer.start - now) < 0) {
    eventTimer["travelling-zoo"].summer.start += 446400000
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
  }
  if ((eventTimer["travelling-zoo"].winter.start - now) < 0) {
    eventTimer["travelling-zoo"].winter.start += 446400000
  }
  if ((eventTimer["travelling-zoo"].winter.end - now) < 0) {
    eventTimer["travelling-zoo"].winter.end += 446400000
    if (eventTimer["travelling-zoo"].winter.pets === "Giraffe") {
      eventTimer["travelling-zoo"].winter.pets = "Tiger"
    } else if (eventTimer["travelling-zoo"].summer.pets === "Tiger") {
      eventTimer["travelling-zoo"].winter.pets = "Monkey"
    } else if (eventTimer["travelling-zoo"].summer.pets === "Monkey") {
      eventTimer["travelling-zoo"].winter.pets = "Giraffe"
    }
  }
  if ((eventTimer["jerry's-workshop"]["winter-island"].start - now) < 0) {
    eventTimer["jerry's-workshop"]["winter-island"].start += 446400000
  }
  if ((eventTimer["jerry's-workshop"]["winter-island"].end - now) < 0) {
    eventTimer["jerry's-workshop"]["winter-island"].end += 446400000
  }
  if ((eventTimer["jerry's-workshop"]["season-of-jerry"].start - now) < 0) {
    eventTimer["jerry's-workshop"]["season-of-jerry"].start += 446400000
  }
  if ((eventTimer["jerry's-workshop"]["season-of-jerry"].end - now) < 0) {
    eventTimer["jerry's-workshop"]["season-of-jerry"].end += 446400000
    eventTimer["jerry's-workshop"]["season-of-jerry"].season += 1
  }
  if ((eventTimer["spooky-festival"].fishing.start - now) < 0) {
    eventTimer["spooky-festival"].fishing.start += 446400000
  }
  if ((eventTimer["spooky-festival"].fishing.end - now) < 0) {
    eventTimer["spooky-festival"].fishing.end += 446400000
  }
  if ((eventTimer["spooky-festival"].event.start - now) < 0) {
    eventTimer["spooky-festival"].event.start += 446400000
  }
  if ((eventTimer["spooky-festival"].event.end - now) < 0) {
    eventTimer["spooky-festival"].event.end += 446400000
    eventTimer["spooky-festival"].event.festival += 1
  }
  if ((eventTimer["new-year-celebration"].start - now) < 0) {
    eventTimer["new-year-celebration"].start += 446400000
  }
  if ((eventTimer["new-year-celebration"].end - now) < 0) {
    eventTimer["new-year-celebration"].end += 446400000
    eventTimer["new-year-celebration"].celebration += 1
  }
  if ((eventTimer.bankinterest.start - now) < 0) {
    eventTimer.bankinterest.start += 111600000
  }
  if ((eventTimer.experimenttable.start - now) < 0) {
    eventTimer.experimenttable.start += 86400000
  }
  if ((eventTimer.commissions.start - now) < 0) {
    eventTimer.commissions.start += 86400000
  }
  if ((eventTimer.fetchur.start - now) < 0) {
    eventTimer.fetchur.start += 86400000
  }
  if ((eventTimer.jacob.start - now) < 0) {
    eventTimer.jacob.start += 3600000
  }
  if ((eventTimer.jacob.end - now) < 0) {
    eventTimer.jacob.end += 3600000
  }
  if ((eventTimer.darkauction.start - now) < 0) {
    eventTimer.darkauction.start += 3600000
  }
  if (oldeventTimer !== eventTimer) {
    db.set("eventTimer2", eventTimer)
  }
}

function get() {
  return eventTimer
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