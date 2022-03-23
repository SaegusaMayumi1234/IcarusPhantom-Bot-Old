const { Client, Intents, Collection } = require('djs-selfbot');

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_BANS,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	Intents.FLAGS.GUILD_INTEGRATIONS,
	Intents.FLAGS.GUILD_WEBHOOKS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_PRESENCES,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_MESSAGE_TYPING,
	Intents.FLAGS.DIRECT_MESSAGES,
	Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	Intents.FLAGS.DIRECT_MESSAGE_TYPING,
	Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
] });

var commandQueue = []
var commandRunning
var commandIsRunning = false
var commandResponded = true
var commandResponseTimeout

function commandHandler() {
    commandResponded = false
    commandRunning = commandQueue.shift()
    let msg
    if (commandRunning.place == "dm") {
      msg = `msg ${commandRunning.username}`
    } else {
      msg = commandRunning.place
    }

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
  if (oldMessage !== replyMessage && !commandResponded) {
    commandResponded = true
    clearTimeout(commandResponseTimeout)
    timer = 2000
    client.channels.cache.get('864289681096966165').send(`g>ca7c8e9b-9309-4c82-b15a-3c51e8eaeba6 ${replyMessage}`)
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

client.on('ready', () => {
  console.log(`Bot2: Logged in as ${client.user.tag}!`);
});
 
client.on('messageCreate', message => {
  if (message.channel.id == '864289681096966165') {
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
    } else {
      let msg
      if (commandRunning !== undefined) {
        if (commandRunning.place == "dm") {
          msg = `msg ${commandRunning.username}`
        } else {
          msg = commandRunning.place
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
                  //`);
                  
            if (field.name == 'Scammer Details') {
              let parts = field.value.split('\n')
              let name = parts[0].replace('IGN: ', '').replace('`', '').replace('`', '')
              let reason = parts[2]
              if (name == "DesteriaHD") {
                replyHandler(`/${msg} ${commandRunning.name} is not a scammer`)
                return
              }
              replyHandler(`/${msg} ${name} is a scammer, ${reason}`)
            } else if (field.name == 'The user IS NOT a scammer') {
              replyHandler(`/${msg} ${commandRunning.name} is not a scammer`)
            } else if (field.name == "We can't fetch the data from Mojang API and can't convert it into a discord account") {
              replyHandler(`/${msg} ${commandRunning.name} is an invalid username`)
            }
          }
        }
      }
    }
  }
});

client.on('messageUpdate', (oldMessage, newMessage) => {})

function connect() {
  client.login(process.env['DISCORD_TOKEN2']);
}

function renew() {
  client.channels.cache.get('818165593692831754').send(`g>apinew`)
}
exports.connect = connect;
exports.renew = renew;