//old index.js
const keepAlive = require('./src/modules/server');
const fs = require('fs');
const Discord = require('discord.js')
const client = new Discord.Client()

client.prefix = 'g>';
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	client.commands.set(command.name, command);
};

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	};
};

keepAlive();

client.login(process.env['DISCORD_TOKEN']);


//old selfbot.js (modules)
const Discord = require('discord.js-selfbot');
const fragbotHandler = require('./fragbotHandler')
const client = new Discord.Client();

var dataCache
var fragbotChannelIDs

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  dataCache = fragbotHandler.get()
  fragbotChannelIDs = Array.from(Object.keys(dataCache))
});
 
client.on('message', message => {
  if (dataCache == undefined) return;
  
  if (fragbotChannelIDs.includes(message.channel.id)) {
    for (let embed of message.embeds) {
      if (embed.title.endsWith('Logs')) {
        let name = embed.title.split(" ").shift()
        if (name !== dataCache[message.channel.id]) {
          dataCache[message.channel.id] = name
          fragbotHandler.save(dataCache)
        }
      }
    }
  }
});

client.on('messageUpdate', (oldMessage, newMessage) => {})

function start() {
  client.login(process.env['DISCORD_TOKEN2']);
}

exports.start = start;