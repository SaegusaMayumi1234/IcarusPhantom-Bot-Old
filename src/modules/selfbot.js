const Discord = require('discord.js-selfbot');
const fragbotHandler = require('./fragbotHandler')
const client = new Discord.Client();

var dataCache

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  dataCache = fragbotHandler.get()
});
 
client.on('message', message => {
  if (dataCache == undefined) return;
  var fragbotChannelIDs = Array.from(Object.keys(dataCache))
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