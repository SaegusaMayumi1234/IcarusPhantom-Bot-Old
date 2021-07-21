const botStatus = require('../modules/botStatus')

module.exports = {
  name: 'botstatus',
  description: 'enable and disable bot status',
  execute(message, args, client) {
    if (message.author.id !== process.env['OWNERID']) {
      message.reply("You don't have permission to do this!")
      return
    }
    if (args == "true" || args == "enable") {
      botStatus.enable()
      message.reply("Bot status is enabled!")
    } else if (args == "false" || args == "disable") {
      botStatus.disable()
      message.reply("Bot status is disabled!")
    } else {
      message.reply("Invalid arguments! only enable / disable.")
    }
  }
}