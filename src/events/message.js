const apiKeyHandler = require("../modules/apiKeyHandler")
const detectBots = require("../modules/detectHackedAccount")

module.exports = {
	name: 'message',
	execute(message, client) {
    if (message.content.startsWith(">>> Your new API key is ")  && message.channel.id == "818165593692831754") {
      let parts = message.content.split(' ')
      let apikey = parts[parts.length - 1]
      apiKeyHandler.save(apikey)

      console.log(apikey)
    }
		if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (message.channel.id === "877364264195751966") {
      detectBots.detect(message, client)
    }
    let commandMessage = message.content.toLowerCase()
    if (!commandMessage.startsWith(client.prefix)) return;

    const args = commandMessage.slice(client.prefix.length).trim().split(/ +/);
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