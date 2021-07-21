const fetchData = require('../utils/fetchData')

module.exports = {
  name: 'check',
  description: 'checking someone status for guild apply',
  execute(message, args, client) {
    let username = args[0]
    let uuid = avgskills = slayers = catacombs = weight = inGuild = scammer = online = ready = "Loading..."
    let header = `Loading data for ${username}`
    let embedMessage = await message.reply({
      embed: {
        color: '7CFC00',
        author: {
          name: `${header}`,
        },
        fields: [
          {
            "name": "Stats",
            "value": `Average Skills: ${avgskills}\nSlayer Experience: ${slayers}\nCatacombs Level: ${catacombs}\nWeight: ${weight}`
          },
          {
            "name": "Guild",
            "value": `InGuild: ${inGuild}`
          },
          {
            "name": "Scammer Check",
            "value": `Status: ${scammer}`
          },
          {
            "name": "Status",
            "value": `Online: ${online}\nReady to Invite: ${ready}`
          },
        ]
      },
    })
    let mojang = await fetchData("https://api.mojang.com/users/profiles/minecraft/" + username)
    if (mojang.status == 200) {
      uuid = mojang.data.id
      username = mojang.data.name
    } else {
      embedMessage.edit({
        embed: {
          description: `Failed to find a valid UUID for the given username!`,
          color: 'DC143C',
          author: {
            name: "Error occured",
          },
        },
      })
      return
    }
    let senither = await fetchData("https://hypixel-api.senither.com/v1/profiles/" + uuid + "/we?key=" + apikey)
    if (senither.status == 200) {
      avgskills = senither.data.data.skills.average_skills.toFixed(2)
      slayers = senither.data.data.slayers.total_experience
      weight = senither.data.data.weight.toFixed(0)
      catacombs = senither.data.data.dungeons
      if (catacombs == undefined) {
        catacombs = 0
      } else {
        catacombs = Math.floor(senither.data.data.dungeons.types.catacombs.level)
      }
      avgskills >= 15 ? avgskills += " ⌠:white_check_mark:⌡" : avgskills += " ⌠:x:⌡"
      slayers >= 20000 ? slayers += " ⌠:white_check_mark:⌡" : slayers += " ⌠:x:⌡"
      catacombs >= 10 ? catacombs += " ⌠:white_check_mark:⌡" : catacombs += " ⌠:x:⌡"
    } else {
      avgskills = "unknown"
      slayers = "unknown"
      catacombs = "unknown"
      weight = "unknown"
    }
    editEmbed()
    let guild = await fetchData('https://api.hypixel.net/guild?key=' + apikey + '&player=' + uuid)
    if (guild.status == 200) {
      guild.data.guild == null ? inGuild = "none ⌠:white_check_mark:⌡" : inGuild = `${guild.data.guild.name} ⌠:x:⌡`
    } else {
      inGuild = "unknown"
    }
    editEmbed()
    let scammerData = await fetchData('https://raw.githubusercontent.com/skyblockz/pricecheckbot/master/scammer.json')
    if (scammerData.status == 200) {
      scammerData.data[uuid] !== undefined ? scammer = `This player is scammer ⌠:x:⌡\nReason: ${scammerData.data[uuid].reason}` : scammer = "This player is not a scammer ⌠:white_check_mark:⌡"
    } else {
      scammer = "unknown"
    }
    editEmbed()
    let onlineData = await fetchData(process.env['URL'] + apikey + "&uuid=" + uuid) 
    if (onlineData.status == 200) {
      onlineData.data.session.online ? online = ":green_circle:" : online = ":red_circle:"
    } else {
      online = ":yellow_circle:"
    }
    if (online == ":green_circle:" && inGuild == "none ⌠:white_check_mark:⌡") {
      ready = "⌠:white_check_mark:⌡"
    } else {
      ready = "⌠:x:⌡"
    }
    header = username
    editEmbed()
    function editEmbed() {
      embedMessage.edit({
        embed: {
          color: '7CFC00',
          author: {
            name: `${header}`,
          },
          fields: [
            {
              "name": "Stats",
              "value": `Average Skills: ${avgskills}\nSlayer Experience: ${slayers}\nCatacombs Level: ${catacombs}\nWeight: ${weight}`
            },
            {
              "name": "Guild",
              "value": `InGuild: ${inGuild}`
            },
            {
              "name": "Scammer Check",
              "value": `Status: ${scammer}`
            },
            {
              "name": "Status",
              "value": `Online: ${online}\nReady to Invite: ${ready}`
            },
          ]
        },
      })
    }
  }
}