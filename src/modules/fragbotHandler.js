const fetchData = require('../utils/fetchData')
const apiKeyHandler = require('./apiKeyHandler')
const db = require('./DatabaseManager')

var fragbot = {
  "830487248507633715": "none",
  "822764121115197451": "none",
  "822777584756195338": "none",
  "823995375156330527": "none"
}

db.get("fragbot").then(value => {
  if (value === null) {
    db.set("fragbot", fragbot)
  } else {
    fragbot = value
  }
})

function get() {
  return fragbot
}

function save(data) {
  db.set("fragbot", data).then(() => {});
  fragbot = data
}

async function getAPI() {
  const apikey = await apiKeyHandler.get()
  let data = []
  let fragbotChannelID = Array.from(Object.keys(fragbot))
  for (const item of fragbotChannelID) {
    const name = fragbot[item]
    const mojang = await fetchData("https://api.mojang.com/users/profiles/minecraft/" + name)
    if (mojang.status == 200) {
      const uuid = mojang.data.id
      const statusHypixel = await fetchData('https://api.hypixel.net/status?key=' + apikey + "&uuid=" + uuid)
      if (statusHypixel.status == 200) {
        let status = statusHypixel.data.session.online == true ? "online" : "offline"
        data.push({
          name: name,
          status: status
        })
      } else {
        data.push({
          name: name,
          status: "unknown"
        })
      }
    } else {
      data.push({
        name: name,
        status: "unknown"
      })
    }
    if (data.length == fragbotChannelID.length) {
      return data
    }
  }
}

exports.get = get;
exports.save = save;
exports.getAPI = getAPI;