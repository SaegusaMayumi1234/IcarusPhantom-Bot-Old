const getStatus = require("../modules/getStatus")

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Logged in as ${client.user.tag}!`);
    getStatus.start(client)
	},
};