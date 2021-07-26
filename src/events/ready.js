const botStatus = require("../modules/botStatus")
const hypixelStatus = require("../modules/hypixelStatus")
const selfbot = require("../modules/selfbot")
const eventTimer = require("../modules/hypixelEventTimer")

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Logged in as ${client.user.tag}!`);
    botStatus.start(client)
    hypixelStatus.start(client)
    selfbot.start()
    eventTimer.start()
	},
};