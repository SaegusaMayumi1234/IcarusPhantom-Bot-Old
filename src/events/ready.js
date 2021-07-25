const botStatus = require("../modules/botStatus")
const hypixelStatus = require("../modules/hypixelStatus")

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Logged in as ${client.user.tag}!`);
    botStatus.start(client)
    hypixelStatus.start(client)
	},
};