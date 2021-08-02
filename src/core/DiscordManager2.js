const Discord = require('discord.js-selfbot');
const fragbotHandler = require('../modules/fragbotHandler')
const client = new Discord.Client();

var dataCache
var fragbotChannelIDs

client.on('ready', () => {
  console.log(`Bot2: Logged in as ${client.user.tag}!`);
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

function connect() {
  client.login(process.env['DISCORD_TOKEN2']);
}

exports.connect = connect;