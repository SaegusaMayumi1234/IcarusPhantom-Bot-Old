const db = require('../DatabaseManager')
const addNotation = require('../../utils/addNotation')
const lbmsgid = {
  weight: [
    "905739505053597736",
    "905739529657384980",
    "905739530894721026",
    "905739538243145749",
    "905739575958306826"
  ],
  avg: [
    "905801065709043762",
    "905801068477317160",
    "905801071237140521",
    "905801073929887785",
    "905801080061956136"
  ],
  slayer: [
    "905801090778423376",
    "905801092443541504",
    "905801094754619402",
    "905801097132773376",
    "905801098588196884"
  ],
  cata: [
    "905801114983727145",
    "905801117424832512",
    "905801118674743307",
    "905801120876748800",
    "905801123074555934"
  ],
  nw: [
    "905801130666254367",
    "905801132629180456",
    "905801134231404585",
    "905801136425029652",
    "905801138006286347"
  ],
}

const lbchannelsid = {
  weight: "902947828333158430",
  avg: "905799489141501972",
  slayer: "905799564613787688",
  cata: "905799634985811989",
  nw: "905799684436680785"
}

let isUpdating = {
  status: false,
  done: false
}
let client

async function updatelb(clientready) {
  client = clientready
  isUpdating = {
    status: true,
    done: false
  }
  let guildData = await db.get("guildScanned")
  setTimeout(() => {
    lbweight(guildData)
  }, 5000)
  setTimeout(() => {
    lbavg(guildData)
  }, 10000)
  setTimeout(() => {
    lbslayer(guildData)
  }, 15000)
  setTimeout(() => {
    lbcata(guildData)
  }, 20000)
  setTimeout(() => {
    lbnw(guildData)
  }, 25000)
  setTimeout(() => {
    isUpdating = {
      status: false,
      done: true
    }
  }, 30000)
  setTimeout(() => {
    isUpdating = {
      status: false,
      done: false
    }
  }, 35000)
}

function lbweight(guildData) {
  let guildDataSorted = guildData.sort((a, b) => b.weight - a.weight)
  let lbArray = []
  for (let i = 0; i < guildDataSorted.length; i++) {
    let rank = `[#${i+1}]`
    let display = `${rank} ${guildDataSorted[i].username}`
    let needAddSpace = 24 - display.length
    for (let iDisplay = 0; iDisplay < needAddSpace; iDisplay++) {
      display += " ";
    }
    display += `: ${Math.round(guildDataSorted[i].weight)}`
    if (i < 25) {
      if (lbArray.length == 0) {
        lbArray.push([])
      }
      lbArray[0].push(display)
    } else if (i < 50) {
      if (lbArray.length == 1) {
        lbArray.push([])
      }
      lbArray[1].push(display)
    } else if (i < 75) {
      if (lbArray.length == 2) {
        lbArray.push([])
      }
      lbArray[2].push(display)
    } else if (i < 100) {
      if (lbArray.length == 3) {
        lbArray.push([])
      }
      lbArray[3].push(display)
    } else if (i < 125) {
      if (lbArray.length == 4) {
        lbArray.push([])
      }
      lbArray[4].push(display)
    }
    /*if (i == guildDataSorted.length - 1) {
      
    }*/
  }
  if (lbArray.length > 0) {
        editEmbed(lbchannelsid.weight, lbmsgid.weight[0], lbArray[0], "Guild Weight Leaderboard")
      } else {
        editEmbed(lbchannelsid.weight, lbmsgid.weight[0], ["none"], "Guild Weight Leaderboard")
      }
      if (lbArray.length > 1) {
        editEmbed(lbchannelsid.weight, lbmsgid.weight[1], lbArray[1], "none")
      } else {
        editEmbed(lbchannelsid.weight, lbmsgid.weight[1], ["none"], "none")
      }
      if (lbArray.length > 2) {
        editEmbed(lbchannelsid.weight, lbmsgid.weight[2], lbArray[2], "none")
      } else {
        editEmbed(lbchannelsid.weight, lbmsgid.weight[2], ["none"], "none")
      }
      if (lbArray.length > 3) {
        editEmbed(lbchannelsid.weight, lbmsgid.weight[3], lbArray[3], "none")
      } else {
        editEmbed(lbchannelsid.weight, lbmsgid.weight[3], ["none"], "none")
      }
      if (lbArray.length > 4) {
        editEmbed(lbchannelsid.weight, lbmsgid.weight[4], lbArray[4], "time")
      } else {
        editEmbed(lbchannelsid.weight, lbmsgid.weight[4], ["none"], "time")
      }
}

function lbavg(guildData) {
  let guildDataSorted = guildData.sort((a, b) => b.avg - a.avg)
  let lbArray = []
  for(let i = 0; i < guildDataSorted.length; i++) {
    let rank = `[#${i+1}]`
    let display = `${rank} ${guildDataSorted[i].username}`
    let needAddSpace = 24 - display.length
    for (let iDisplay = 0; iDisplay < needAddSpace; iDisplay++) {
      display += " ";
    }
    display += `: ${guildDataSorted[i].avg.toFixed(2)}`
    if (i < 25) {
      if (lbArray.length == 0) {
        lbArray.push([])
      }
      lbArray[0].push(display)
    } else if (i < 50) {
      if (lbArray.length == 1) {
        lbArray.push([])
      }
      lbArray[1].push(display)
    } else if (i < 75) {
      if (lbArray.length == 2) {
        lbArray.push([])
      }
      lbArray[2].push(display)
    } else if (i < 100) {
      if (lbArray.length == 3) {
        lbArray.push([])
      }
      lbArray[3].push(display)
    } else if (i < 125) {
      if (lbArray.length == 4) {
        lbArray.push([])
      }
      lbArray[4].push(display)
    }
    /*if (i == guildDataSorted.length - 1) {
      
    }*/
  }
  if (lbArray.length > 0) {
        editEmbed(lbchannelsid.avg, lbmsgid.avg[0], lbArray[0], "Guild Skill Average Leaderboard")
      } else {
        editEmbed(lbchannelsid.avg, lbmsgid.avg[0], ["none"], "Guild Skill Average Leaderboard")
      }
      if (lbArray.length > 1) {
        editEmbed(lbchannelsid.avg, lbmsgid.avg[1], lbArray[1], "none")
      } else {
        editEmbed(lbchannelsid.avg, lbmsgid.avg[1], ["none"], "none")
      }
      if (lbArray.length > 2) {
        editEmbed(lbchannelsid.avg, lbmsgid.avg[2], lbArray[2], "none")
      } else {
        editEmbed(lbchannelsid.avg, lbmsgid.avg[2], ["none"], "none")
      }
      if (lbArray.length > 3) {
        editEmbed(lbchannelsid.avg, lbmsgid.avg[3], lbArray[3], "none")
      } else {
        editEmbed(lbchannelsid.avg, lbmsgid.avg[3], ["none"], "none")
      }
      if (lbArray.length > 4) {
        editEmbed(lbchannelsid.avg, lbmsgid.avg[4], lbArray[4], "time")
      } else {
        editEmbed(lbchannelsid.avg, lbmsgid.avg[4], ["none"], "time")
      }
}

function lbslayer(guildData) {
  let guildDataSorted = guildData.sort((a, b) => b.slayer - a.slayer)
  let lbArray = []
  for(let i = 0; i < guildDataSorted.length; i++) {
    let rank = `[#${i+1}]`
    let display = `${rank} ${guildDataSorted[i].username}`
    let needAddSpace = 24 - display.length
    for (let iDisplay = 0; iDisplay < needAddSpace; iDisplay++) {
      display += " ";
    }
    display += `: ${addNotation("commas", guildDataSorted[i].slayer)} (${addNotation("oneLetters", guildDataSorted[i].slayer)})`
    if (i < 25) {
      if (lbArray.length == 0) {
        lbArray.push([])
      }
      lbArray[0].push(display)
    } else if (i < 50) {
      if (lbArray.length == 1) {
        lbArray.push([])
      }
      lbArray[1].push(display)
    } else if (i < 75) {
      if (lbArray.length == 2) {
        lbArray.push([])
      }
      lbArray[2].push(display)
    } else if (i < 100) {
      if (lbArray.length == 3) {
        lbArray.push([])
      }
      lbArray[3].push(display)
    } else if (i < 125) {
      if (lbArray.length == 4) {
        lbArray.push([])
      }
      lbArray[4].push(display)
    }
    /*if (i == guildDataSorted.length - 1) {
      
    }*/
  }
  if (lbArray.length > 0) {
        editEmbed(lbchannelsid.slayer, lbmsgid.slayer[0], lbArray[0], "Guild Slayer Leaderboard")
      } else {
        editEmbed(lbchannelsid.slayer, lbmsgid.slayer[0], ["none"], "Guild Slayer Leaderboard")
      }
      if (lbArray.length > 1) {
        editEmbed(lbchannelsid.slayer, lbmsgid.slayer[1], lbArray[1], "none")
      } else {
        editEmbed(lbchannelsid.slayer, lbmsgid.slayer[1], ["none"], "none")
      }
      if (lbArray.length > 2) {
        editEmbed(lbchannelsid.slayer, lbmsgid.slayer[2], lbArray[2], "none")
      } else {
        editEmbed(lbchannelsid.slayer, lbmsgid.slayer[2], ["none"], "none")
      }
      if (lbArray.length > 3) {
        editEmbed(lbchannelsid.slayer, lbmsgid.slayer[3], lbArray[3], "none")
      } else {
        editEmbed(lbchannelsid.slayer, lbmsgid.slayer[3], ["none"], "none")
      }
      if (lbArray.length > 4) {
        editEmbed(lbchannelsid.slayer, lbmsgid.slayer[4], lbArray[4], "time")
      } else {
        editEmbed(lbchannelsid.slayer, lbmsgid.slayer[4], ["none"], "time")
      }
}

function lbcata(guildData) {
  let guildDataSorted = guildData.sort((a, b) => b.catacombs.experience - a.catacombs.experience)
  let lbArray = []
  for(let i = 0; i < guildDataSorted.length; i++) {
    let rank = `[#${i+1}]`
    let display = `${rank} ${guildDataSorted[i].username}`
    let needAddSpace = 24 - display.length
    for (let iDisplay = 0; iDisplay < needAddSpace; iDisplay++) {
      display += " ";
    }
    display += `: ${addNotation("commas", guildDataSorted[i].catacombs.experience)} (${guildDataSorted[i].catacombs.level.toFixed(2)})`
    if (i < 25) {
      if (lbArray.length == 0) {
        lbArray.push([])
      }
      lbArray[0].push(display)
    } else if (i < 50) {
      if (lbArray.length == 1) {
        lbArray.push([])
      }
      lbArray[1].push(display)
    } else if (i < 75) {
      if (lbArray.length == 2) {
        lbArray.push([])
      }
      lbArray[2].push(display)
    } else if (i < 100) {
      if (lbArray.length == 3) {
        lbArray.push([])
      }
      lbArray[3].push(display)
    } else if (i < 125) {
      if (lbArray.length == 4) {
        lbArray.push([])
      }
      lbArray[4].push(display)
    }
    /*if (i == guildDataSorted.length - 1) {
      
    }*/
  }
  if (lbArray.length > 0) {
        editEmbed(lbchannelsid.cata, lbmsgid.cata[0], lbArray[0], "Guild Catacombs Leaderboard")
      } else {
        editEmbed(lbchannelsid.cata, lbmsgid.cata[0], ["none"], "Guild Catacombs Leaderboard")
      }
      if (lbArray.length > 1) {
        editEmbed(lbchannelsid.cata, lbmsgid.cata[1], lbArray[1], "none")
      } else {
        editEmbed(lbchannelsid.cata, lbmsgid.cata[1], ["none"], "none")
      }
      if (lbArray.length > 2) {
        editEmbed(lbchannelsid.cata, lbmsgid.cata[2], lbArray[2], "none")
      } else {
        editEmbed(lbchannelsid.cata, lbmsgid.cata[2], ["none"], "none")
      }
      if (lbArray.length > 3) {
        editEmbed(lbchannelsid.cata, lbmsgid.cata[3], lbArray[3], "none")
      } else {
        editEmbed(lbchannelsid.cata, lbmsgid.cata[3], ["none"], "none")
      }
      if (lbArray.length > 4) {
        editEmbed(lbchannelsid.cata, lbmsgid.cata[4], lbArray[4], "time")
      } else {
        editEmbed(lbchannelsid.cata, lbmsgid.cata[4], ["none"], "time")
      }
}

function lbnw(guildData) {
  let guildDataSorted = guildData.sort((a, b) => b.networth - a.networth)
  let lbArray = []
  for(let i = 0; i < guildDataSorted.length; i++) {
    let rank = `[#${i+1}]`
    let display = `${rank} ${guildDataSorted[i].username}`
    let needAddSpace = 24 - display.length
    for (let iDisplay = 0; iDisplay < needAddSpace; iDisplay++) {
      display += " ";
    }
    display += `: ${addNotation("commas", guildDataSorted[i].networth)} (${addNotation("oneLetters", guildDataSorted[i].networth)})`
    if (i < 25) {
      if (lbArray.length == 0) {
        lbArray.push([])
      }
      lbArray[0].push(display)
    } else if (i < 50) {
      if (lbArray.length == 1) {
        lbArray.push([])
      }
      lbArray[1].push(display)
    } else if (i < 75) {
      if (lbArray.length == 2) {
        lbArray.push([])
      }
      lbArray[2].push(display)
    } else if (i < 100) {
      if (lbArray.length == 3) {
        lbArray.push([])
      }
      lbArray[3].push(display)
    } else if (i < 125) {
      if (lbArray.length == 4) {
        lbArray.push([])
      }
      lbArray[4].push(display)
    }
    /*if (i == guildDataSorted.length - 1) {
      
    }*/
  }
  if (lbArray.length > 0) {
    editEmbed(lbchannelsid.nw, lbmsgid.nw[0], lbArray[0], "Guild Networth Leaderboard")
  } else {
    editEmbed(lbchannelsid.nw, lbmsgid.nw[0], ["none"], "Guild Networth Leaderboard")
  }
  if (lbArray.length > 1) {
    editEmbed(lbchannelsid.nw, lbmsgid.nw[1], lbArray[1], "none")
  } else {
    editEmbed(lbchannelsid.nw, lbmsgid.nw[1], ["none"], "none")
  }
  if (lbArray.length > 2) {
    editEmbed(lbchannelsid.nw, lbmsgid.nw[2], lbArray[2], "none")
  } else {
    editEmbed(lbchannelsid.nw, lbmsgid.nw[2], ["none"], "none")
  }
  if (lbArray.length > 3) {
    editEmbed(lbchannelsid.nw, lbmsgid.nw[3], lbArray[3], "none")
  } else {
    editEmbed(lbchannelsid.nw, lbmsgid.nw[3], ["none"], "none")
  }
  if (lbArray.length > 4) {
    editEmbed(lbchannelsid.nw, lbmsgid.nw[4], lbArray[4], "time")
  } else {
    editEmbed(lbchannelsid.nw, lbmsgid.nw[4], ["none"], "time")
  }
}

function editEmbed(channel, id, display, additional) {
  let messageEdited = "```cs\n" + display.join("\n") + "```"
  client.channels.cache.get(channel).messages.fetch(id).then(message => {
    if (additional.includes("Guild")) {
      message.edit(
        {
          embed: {
            author: {
              name: additional
            },
            description: messageEdited,
            color: 'D400FF'
          }
        }
      )
    } else if (additional === "time") {
      message.edit(
        {
          embed: {
            description: messageEdited,
            color: 'D400FF',
            timestamp: new Date(),
            footer: {
              text: `Last Updated`
            }
          }
        }
      )
    } else {
      message.edit(
        {
          embed: {
            description: messageEdited,
            color: 'D400FF'
          }
        }
      )
    }
  })
}

function getlbUpdateStatus() {
  return isUpdating
}

exports.updatelb = updatelb;
exports.getlbUpdateStatus = getlbUpdateStatus;
