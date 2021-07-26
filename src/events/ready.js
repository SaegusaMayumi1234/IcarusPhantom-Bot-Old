const botStatus = require("../modules/botStatus")
const hypixelStatus = require("../modules/hypixelStatus")
const selfbot = require("../modules/selfbot")

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Logged in as ${client.user.tag}!`);
    botStatus.start(client)
    hypixelStatus.start()
    selfbot.start()
	},
};