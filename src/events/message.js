const Database = require("@replit/database")
const apiKeyHandler = require("../modules/apiKeyHandler")

const db = new Database()

module.exports = {
	name: 'message',
	execute(message, client) {
    if (message.content.startsWith(">>> Your new API key is ")  && msg.channel.id == process.env['MESSAGECHANNEL']) {
      let parts = msg.content.split(' ')
      let apikey = parts[parts.length - 1]
      apiKeyHandler.save(apikey)

      console.log(apikey)
    }
		if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
      command.execute(message, args, client);
    } catch (err) {
      console.log(err)
    }
	},
};