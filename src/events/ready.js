const botStatus = require("../modules/botStatus")
const hypixelStatus = require("../modules/hypixelStatus")
//const selfbot = require("../modules/selfbot")
const eventTimer = require("../modules/hypixelEventTimer")
const bzahAPIHandler = require("../modules/bzahAPIHandler")

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`bot1: Logged in as ${client.user.tag}!`);
    const activities = [
      `Listening to any commands!`,
      `Made by IcarusPhantom!`,
      `Rianlyn is an egirl!`,
      `Hello there!`
    ]
    let i = 0
    setInterval(() => {
      client.user.setActivity(`${activities[i++ % activities.length]}`, {type: ""})
    }, 15 * 1000)
    botStatus.start(client)
    hypixelStatus.start(client)
    //selfbot.start()
    eventTimer.start()
    bzahAPIHandler.start()
	},
};