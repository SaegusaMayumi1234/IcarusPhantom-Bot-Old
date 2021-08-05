const db = require("./DatabaseManager")

var eventTimer = {
  "election-booth": {
    "open": 1628345700000,
    "close": 1628234100000
  },
  "travelling-zoo": {
    "summer": {
      "start": 1628240100000,
      "end": 1628243700000
    },
    "winter": {
      "start": 1628463300000,
      "end": 1628466900000
    }
  },
  "jerry's-workshop": {
    "winter-island": {
      "start": 1628537700000,
      "end": 1628573700000
    },
    "season-of-jerry": {
      "start": 1628565300000,
      "end": 1628568900000
    }
  },
  "spooky-festival": {
    "fishing": {
      "start": 1628418900000,
      "end": 1628429700000
    },
    "event": {
      "start": 1628422500000,
      "end": 1628426100000
    }
  },
  "new-year-celebration": {
    "start": 1628571300000,
    "end": 1628574900000
  }
}

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



function update() {
  const now = new Date().getTime()
  const oldeventTimer = eventTimer
  if ((eventTimer["election-booth"].open - now) < 0) {
    eventTimer["election-booth"].open += 446400000
  }
  if ((eventTimer["election-booth"].close - now) < 0) {
    eventTimer["election-booth"].close += 446400000
  }
  if ((eventTimer["travelling-zoo"].summer.start - now) < 0) {
    eventTimer["travelling-zoo"].summer.start += 446400000
  }
  if ((eventTimer["travelling-zoo"].summer.end - now) < 0) {
    eventTimer["travelling-zoo"].summer.end += 446400000
  }
  if ((eventTimer["travelling-zoo"].winter.start - now) < 0) {
    eventTimer["travelling-zoo"].winter.start += 446400000
  }
  if ((eventTimer["travelling-zoo"].winter.end - now) < 0) {
    eventTimer["travelling-zoo"].winter.end += 446400000
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
  }
  if ((eventTimer["new-year-celebration"].start - now) < 0) {
    eventTimer["new-year-celebration"].start += 446400000
  }
  if ((eventTimer["new-year-celebration"].end - now) < 0) {
    eventTimer["new-year-celebration"].end += 446400000
  }
  if (oldeventTimer !== eventTimer) {
    db.set("eventTimer2", eventTimer)
  }
}

function get() {
  return eventTimer
}

exports.get = get;