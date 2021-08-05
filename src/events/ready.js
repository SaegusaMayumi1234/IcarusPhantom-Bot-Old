const botStatus = require("../modules/botStatus")
const hypixelStatus = require("../modules/hypixelStatus")
//const selfbot = require("../modules/selfbot")
const eventTimer = require("../modules/hypixelEventTimer")
const bzahAPIHandler = require("../modules/bzahAPIHandler")
const skyblockCalendar = require("../modules/skyblockCalendar")

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`bot1: Logged in as ${client.user.tag}!`);
    const activities = [
      `Guild Chat!`,
      `Skyblock Event!`,
      `SHI Discord Server!`,
      `Skyblock Update!`
    ]
    let i = 0
    setInterval(() => {
      client.user.setActivity(`${activities[i++ % activities.length]}`, {type: "WATCHING"})
    }, 15 * 1000)
    botStatus.start(client)
    hypixelStatus.start(client)
    //selfbot.start()
    eventTimer.start()
    bzahAPIHandler.start()
    skyblockCalendar.start(client)
	},
};