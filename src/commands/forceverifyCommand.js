const fetchData = require('../utils/fetchData')
const apiKeyHandler = require('../modules/apiKeyHandler')
const verifyDataHandler = require('../modules/verifyDataHandler')

module.exports = {
  name: 'forceverify',
  description: 'verifying your minecraft and you discord account',
  async execute(message, args, client) {
    if (!message.member.roles.cache.some(role => role.id === "814789859016966184")) return;
    let apikey = apiKeyHandler.get()
    let username = args[0]
    let embedMessage = await message.reply({
      embed: {
        description: `Loading Hypixel player data for ${username}!`,
        color: '6495ED',
        author: {
          name: "Verifying Account",
        },
      },
    })
    let member = message.mentions.members.first()
    if (member === undefined) {
      let errmsg = "Please tag someone you want to forceverify"
      errorHandle(embedMessage, message, errmsg)
      return
    }
    if (username == undefined || username == "") {
      let errmsg = `Please give valid minecraft username!`
      errorHandle(embedMessage, message, errmsg)
      return
    }
    let mojang = await fetchData("https://api.mojang.com/users/profiles/minecraft/" + username)
    let uuid = "none"
    if (mojang.status == 200) {
      uuid = mojang.data.id
      username = mojang.data.name
    } else {
      let errmsg = `Failed to find a valid UUID for the given username!`
      errorHandle(embedMessage, message, errmsg)
      return
    }
    let hypixelplayer = await fetchData(`https://api.hypixel.net/player?key=${apikey}&uuid=${uuid}`)
    let hypixelRank = "none"
    if (hypixelplayer.status == 200) {
      hypixelRank = hypixelplayer.data.player.newPackageRank == undefined ? "none" : hypixelplayer.data.player.newPackageRank
      if (hypixelplayer.data.player.newPackageRank == "MVP_PLUS" && hypixelplayer.data.player.monthlyPackageRank == "SUPERSTAR") {
        hypixelRank = "MVP_PLUS_PLUS"
      }
    } else {
      let errmsg = `An unknown error occured while trying to fetch data from hypixel please try again later!`
      errorHandle(embedMessage, message, errmsg)
      return
    }
    let hypixelguild = await fetchData('https://api.hypixel.net/guild?key=' + apikey + '&player=' + uuid)
    let currguild = "none"
    let guildRank = "none"
    if (hypixelguild.status == 200) {
      if (hypixelguild.data.guild !== null) {
        currguild = hypixelguild.data.guild["_id"]
        if (currguild == "5ecc8b948ea8c98d63a2936d") {
          hypixelguild.data.guild.members.forEach(player => {
            if (player.uuid == uuid) {
              guildRank = player.rank
            }
          })
        }
      }
    } else {
      let errmsg = `An unknown error occured while trying to fetch data from hypixel please try again later!`
      errorHandle(embedMessage, message, errmsg)
      return
    }
    let datacache = {
      "username": username,
      "uuid": uuid,
      "shiguild": currguild == "5ecc8b948ea8c98d63a2936d" ? true : false,
      "discordtag": member.user.tag,
      "discordid": member.id,
      "forced": true,
      "discordtagcache": [],
      "discordidcache": []
    }
    verifyDataHandler.save(datacache)
    let currguildRankRole = "none"
    let currhypixelRankRole = "none"
    let guildRole = false
    var item = ["your account has now been verified"]
    let hypixelrankArray = Array.from(Object.keys(hypixelrank2role))
    let guildrankArray = Array.from(Object.keys(guildrank2role))
    if (hypixelrankArray.includes(hypixelRank)) {
      item.push(`You have **${hypixelrank2role[hypixelRank].name}** rank in hypixel`)
    }
    if (guildRank !== "none") {
      item.push(`You have **${guildRank}** guild rank in hypixel`)
    }
    hypixelrankArray.forEach(item => {
      if (member.roles.cache.some(role => role.id === hypixelrank2role[item].id)) {
        currhypixelRankRole = item
      }
    })
    guildrankArray.forEach(item => {
      if (member.roles.cache.some(role => role.id === guildrank2role[item])) {
        currguildRankRole = item
      }
    })
    if (member.roles.cache.some(role => role.id === guildrolediscord)) {
      guildRole = true
    }
    if (currhypixelRankRole !== hypixelRank) {
      if (currhypixelRankRole !== "none") {
        member.roles.remove(hypixelrank2role[currhypixelRankRole].id);
        item.push(`-<@&${hypixelrank2role[currhypixelRankRole].id}>`)
      }
      if (hypixelRank !== "none") {
        member.roles.add(hypixelrank2role[hypixelRank].id);
        item.push(`+<@&${hypixelrank2role[hypixelRank].id}>`)
      }
    }
    if (currguildRankRole !== guildRank) {
      if (currguildRankRole !== "none") {
        member.roles.remove(guildrank2role[currguildRankRole]);
        item.push(`-<@&${guildrank2role[currguildRankRole]}>`)
      }
      if (guildRank !== "none" && guildRank !== "Admiral" && guildRank !== "Guild Master") {
        member.roles.add(guildrank2role[guildRank]);
        item.push(`+<@&${guildrank2role[guildRank]}>`)
      }
    }
    if (currguild == "5ecc8b948ea8c98d63a2936d") {
      if (guildRole == false) {
        member.roles.add(guildrolediscord);
        item.push(`+<@&${guildrolediscord}>`)
      }
    } else {
      if (guildRole == true) {
        member.roles.remove(guildrolediscord);
        item.push(`-<@&${guildrolediscord}>`)
      }
    }
    let desc = item.join('\n')
    embedMessage.edit({
      embed: {
        description: desc,
        color: '7CFC00',
        author: {
          name: "Verifying Account",
        },
      },
    })
    setTimeout(() => {
      embedMessage.delete()
      message.delete()
    }, 10 * 1000);
  }
}

function errorHandle(embedMessage, message, errmsg) {
  embedMessage.edit({
    embed: {
      description: `${errmsg}`,
      color: 'DC143C',
      author: {
        name: "Error occured",
      },
    },
  })
  setTimeout(() => {
    embedMessage.delete()
    message.delete()
  }, 15 * 1000);
}

const hypixelrank2role = {
  "VIP": {"name": "VIP", "id": "772751324882272266"},
  "VIP_PLUS": {"name": "VIP+", "id": "772751654286000160"},
  "MVP": {"name": "MVP", "id": "772751693842612255"},
  "MVP_PLUS": {"name": "MVP+", "id": "772751749114888232"},
  "MVP_PLUS_PLUS": {"name": "MVP++", "id": "772751924231012382"}
}

const guildrank2role = {
  "Ranger": "814767730329649182",
  "Mentor": "814767599598305310",
  "Inquisitor": "814767478982574140",
  "Minister": "814767053554188339"
}

const guildrolediscord = "814767989202878504"