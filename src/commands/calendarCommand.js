const hypixelEventTimer2 = require("../modules/hypixelEventTimer2")

module.exports = {
  name: 'calendar',
  description: 'editting calendar event',
  execute(message, args, client) {
    return
    if (message.author.id !== "433183607646060544") {
      message.reply("You don't have permission to do this!")
      return
    }

    let arg = message.content.split(' ')
    let statement = arg[3]
    let event = arg[1]
    let type = arg[2]

    if (statement === undefined || event === undefined || type === undefined) {
      message.reply(`invalid argument please check the docs`)
      return
    }

    if (event !== "FishingFestival" && event !== "MiningFestival") {
      message.reply(`invalid event (FishingFestival/MiningFestival)`)
      return
    }

    if (type !== "extra" && type !== "normal") {
      message.reply(`invalid type (normal/extra)`)
      return
    }

    if (statement === "true") {
      statement = true
    } else {
      statement = false
    }

    if (statement !== true && statement !== false) {
      message.reply(`invalid statement (true/false)`)
      return
    }

    hypixelEventTimer2.changeActive(event, type, statement)
    message.reply(`successfully change ${type} ${event} to ${statement}`)
  }
}