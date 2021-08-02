//const keepAlive = require('./src/modules/server');
const fs = require('fs');
const Discord = require('discord.js')
const client = new Discord.Client()

client.prefix = 'g>';
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	client.commands.set(command.name, command);
};

for (const file of eventFiles) {
	const event = require(`../events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	};
};

//keepAlive();
function connect() {
  client.login(process.env['DISCORD_TOKEN']);
}

exports.connect = connect;