function detect(message, client) {
  message.delete()
  if (message.content.includes("https://") || message.content.includes("http://") || message.content.includes("@everyone")) {
    message.author.send({
      embed: {
        description: "You have been kicked from SHI Discord server!\n\n**Reason**: Your account has been detected as compromised\n**Moderator**: Automatic by SHI bot\n\nif you believe this is a mistake please contact IcarusPhantom#9084",
        color: 'F04947',
        timestamp: new Date(),
        author: {
          name: "Warning"
        },
      }
    })
    let userTag = message.member.user.tag
    let userID = message.author.id
    setTimeout(() => {
      message.guild.members.cache.get(message.member.id).kick()
      .then(() => {
        client.channels.fetch("774108337478041601").then(channel => {
          channel.send({
            content: `<@&773025566781341696>, An user has been kicked! Scanning all channel for deleting all scam/phising advertising message`,
            embed: {
              description: `**Tag**: ${userTag}\n**id**: ${userID}\n**Reason**: account has been detected as compromised\n**Moderator**: Automatic by SHI bot`,
              color: 'F04947',
              timestamp: new Date(),
              author: {
                name: "Kicked"
              },
            }
          })
        })
      })
      .catch(error => {
        client.channels.fetch("774108337478041601").then(channel => {
          channel.send({
            content: `<@&773025566781341696>, An user can't be kicked unfotunately! Scanning all channel for deleting all scam/phising advertising message`,
            embed: {
              description: `**Tag**: ${userTag}\n**id**: ${userID}\n**Reason**: account has been detected as compromised\n**Moderator**: Automatic by SHI bot`,
              color: 'F04947',
              timestamp: new Date(),
              author: {
                name: "Kicked"
              },
            }
          })
        })
      })
      checkAllChannels(message, client)
    }, 500)
  }
}

function checkAllChannels(cachedMessage, client) {
  client.guilds.fetch("772744864717996052").then(guild => {
    let channels = guild.channels.cache.array()
    channels.forEach(channelItem => {
      client.channels.fetch(channelItem.id).then(channel => {
        try {
          channel.messages.fetch({limit: 100}).then(messages => {
            messages.array().forEach(message => {
              if (message.content === cachedMessage.content || message.content.includes(cachedMessage.content)) {
                message.delete()
                message.channel.send({
                  embed: {
                    description: "A message has been automatic deleted because contain scam/phising advertising!\nMessage author has been kicked from this discord server\n\n**Please don't try to click link that sent to you from DM or another server that are suspicious!**",
                    color: 'F04947',
                    timestamp: new Date(),
                    author: {
                      name: "Warning"
                    },
                  }
                })
              }
            })
          })
        } catch (error) {}
      })
    })
  })
}

exports.detect = detect;