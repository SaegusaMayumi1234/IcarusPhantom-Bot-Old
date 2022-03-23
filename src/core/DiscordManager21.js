const Discord = require('discord.js-selfbot');
const fragbotHandler = require('../modules/fragbotHandler')
const client = new Discord.Client();

var dataCache
var fragbotChannelIDs
var commandQueue = []
var commandRunning
var commandIsRunning = false
var commandResponded = true
var commandResponseTimeout

client.on('ready', () => {
  console.log(`Bot2: Logged in as ${client.user.tag}!`);
  dataCache = fragbotHandler.get()
  fragbotChannelIDs = Array.from(Object.keys(dataCache))
});
 
client.on('message', message => {
  if (dataCache == undefined) return;
  if (message.channel.id === "864289681096966165") {
    if (message.content.startsWith("!sc")) {
      let args = message.content.split(" ")
      let username = args[1]
      let name = args[2]
      let place = args[3]
      let commandTemplate = {
        "username": username,
        "name": name,
        "place": place
      }
      commandQueue.push(commandTemplate)
      commandQueueHandler("onmessage")
    }
    for (let embed of message.embeds) { // these are some of the properties
            //console.log(`
            //    Title: ${embed.title}
            //    Author: ${embed.author}
            //    Description: ${embed.description}
            //`);
      for (let field of embed.fields) {
                //console.log(`
                //    Field title: ${field.name}
                //    Field value: ${field.value}
                //`)     
        if (field.name == 'Scammer Details') {
          let parts = field.value.split('\n')
          let name = parts[0].replace('IGN: ', '').replace('`', '').replace('`', '')
          let reason = parts[2]
          replyHandler(`${name} is a scammer, ${reason}`)
        } else if (field.name == 'The user IS NOT a scammer') {
          replyHandler(`${commandRunning.name} is not a scammer`)
        } else if (field.name == "We can't fetch the data from Mojang API and can't convert it into a discord account") {
          replyHandler(`${commandRunning.name} is an invalid username`)
        }
      }
    }
  }
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

function commandHandler() {
    commandResponded = false
    commandRunning = commandQueue.shift()
    client.channels.cache.get('864289681096966165').send(`$s c ${commandRunning.name}`)
    if (!commandResponded) {
      commandResponseTimeout = setTimeout(() => {
        replyHandler(`/${msg} ${commandRunning.username} Seems the bot isn't responding anything. Warning this might result error for other command!`)
      }, 20000)
    }
} 

function commandQueueHandler(origin) {
	if (origin == "onmessage") {
		if (commandQueue.length != 0 && !commandIsRunning) {
			commandIsRunning = true
		  commandHandler()
		}
	} else if (origin == "replyhandler") {
		if (commandQueue.length != 0) {
		  commandHandler()
		} else {
			commandIsRunning = false
    }
	}
}

var oldMessage
var timer = 0
function replyHandler(replyMessage) {
  let msg
  if (commandRunning !== undefined) {
    if (commandRunning.place == "dm") {
      msg = `msg ${commandRunning.username}`
    } else {
      msg = commandRunning.place
    }
  }
  console.log("test")
  if (oldMessage !== replyMessage && !commandResponded) {
    commandResponded = true
    clearTimeout(commandResponseTimeout)
    timer = 2000
    client.channels.cache.get('864289681096966165').send(`g>ca7c8e9b-9309-4c82-b15a-3c51e8eaeba6 /${msg} ${replyMessage}`)
    oldMessage = replyMessage
    setTimeout(() => {
      commandQueueHandler("replyhandler")
    }, 2000);
    	
  } else {
    client.channels.cache.get('864289681096966165').send(`double message prevented: ${replyMessage}`)
  }
}

setInterval(() => {
  if (timer == 0) {
    oldMessage = undefined
  } else {
    timer -= 100
  }
}, 100);

client.on('messageUpdate', (oldMessage, newMessage) => {})

function connect() {
  client.login(process.env['DISCORD_TOKEN2']);
}

function renew() {
  client.channels.cache.get('818165593692831754').send(`g>apinew`)
}

exports.connect = connect;
exports.renew = renew;