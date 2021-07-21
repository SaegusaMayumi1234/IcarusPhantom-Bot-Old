const botStatus = require("../modules/botStatus")

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Logged in as ${client.user.tag}!`);
    botStatus.start(client)
	},
};