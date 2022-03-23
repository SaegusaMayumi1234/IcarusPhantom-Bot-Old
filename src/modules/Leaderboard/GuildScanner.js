const apiKeyHandler = require('../apiKeyHandler')
const { getHypixelGuild, getHypixelSkyblock } = require('./RequestHandler/Hypixel')
const { getMojang } = require('./RequestHandler/Mojang')
const { getSenither } = require('./RequestHandler/Senither')
const { getMaro } = require('./RequestHandler/Maro')
const db = require('../DatabaseManager')
const { updatelb } = require('./LeaderboardUpdater')
const fs = require('fs')

let isScanning = false
let client

async function scanGuild(clientready) {
  client = clientready
  isScanning = true
  let apikey = apiKeyHandler.get()
  let guildMembers = await getHypixelGuild("5ecc8b948ea8c98d63a2936d", apikey)
  let memberData = []
  let errorNeedRequest = []
  let errorThrow = []
  getPlayerData(guildMembers.data, memberData, errorNeedRequest, errorThrow)
}

async function getPlayerData(guildMembers, memberData, errorNeedRequest, errorThrow) {
  let apikey = apiKeyHandler.get()
    if (guildMembers.length !== 0) {
        let playerRequesting = guildMembers.shift()
        let mojang = await getMojang(playerRequesting.uuid)
        if (mojang.status !== 200) {
            console.log("mojang error: " + playerRequesting.uuid)
            if (mojang.status == 404 || mojang.status == 502) {
                errorThrow.push(playerRequesting)
            } else if (mojang.status == 500) {
                errorNeedRequest.push(playerRequesting)
            }
            getPlayerData(guildMembers, memberData, errorNeedRequest, errorThrow, apikey)
            return
        }
        let senither = await getSenither(playerRequesting.uuid, apikey)
        if (senither.status !== 200) {
            console.log("senither error: " + playerRequesting.uuid)
            if (senither.status == 404 || senither.status == 502) {
                errorThrow.push(playerRequesting)
            } else if (senither.status == 500 || senither.status == 403) {
                errorNeedRequest.push(playerRequesting)
            }
            getPlayerData(guildMembers, memberData, errorNeedRequest, errorThrow, apikey)
            return
        }
        let hypixelSBProfile = await getHypixelSkyblock(playerRequesting.uuid, apikey)
        if (hypixelSBProfile.status !== 200) {
            console.log("hypixel error: " + playerRequesting.uuid)
            if (hypixelSBProfile.status == 404 || hypixelSBProfile.status == 502) {
                errorThrow.push(playerRequesting)
            } else if (hypixelSBProfile.status == 500 || hypixelSBProfile.status == 403) {
                errorNeedRequest.push(playerRequesting)
            }
            getPlayerData(guildMembers, memberData, errorNeedRequest, errorThrow, apikey)
            return
        }
        let proccesedProfile = []
        hypixelSBProfile.data.forEach(profile => {
            if (profile.members[playerRequesting.uuid].inv_contents !== undefined) {
                let sumProfile = profile.members[playerRequesting.uuid]
                if (profile.banking !== undefined) {
                    sumProfile.banking = profile.banking
                }
                proccesedProfile.push(sumProfile)
            }
        })
        let maro = await getMaro(proccesedProfile)
        //console.log(maro)
        let highestNetworth = 0
        if (maro.status == 200) {
            maro.data.sort(function(a, b){return b-a})
            highestNetworth = maro.data[0]
        } else if (maro.status == 500 || maro.status == 504 || maro.status == 520) {
            errorNeedRequest.push(playerRequesting)
            getPlayerData(guildMembers, memberData, errorNeedRequest, errorThrow, apikey)
            return
        } else if (maro.status == 502) {
            errorThrow.push(playerRequesting)
            getPlayerData(guildMembers, memberData, errorNeedRequest, errorThrow, apikey)
            return
        }
        //console.log(senither.data.data.skills)
        let dataFinal = {
            uuid: playerRequesting.uuid,
            username: mojang.data.data.player.username,
            weight: senither.data.data.weight + senither.data.data.weight_overflow,
            avg: senither.data.data.skills == null ? 0 : senither.data.data.skills.average_skills,
            slayer: senither.data.data.slayers.total_experience,
            catacombs: {
                level: senither.data.data.dungeons == null ? 0 : senither.data.data.dungeons.types.catacombs.level,
                experience: senither.data.data.dungeons == null ? 0 : senither.data.data.dungeons.types.catacombs.experience
            },
            networth: highestNetworth
        }
        //console.log(dataFinal)
        memberData.push(dataFinal)
        console.log(memberData.length + ": " + playerRequesting.uuid)
        //console.log(memberData.length)
        setTimeout(() => {
            getPlayerData(guildMembers, memberData, errorNeedRequest, errorThrow, apikey)
        }, 1000);
    } else {
        if (errorNeedRequest.length !== 0) {
            guildMembers = errorNeedRequest
            errorNeedRequest = []
            getPlayerData(guildMembers, memberData, errorNeedRequest, errorThrow, apikey)
        } else {
          db.set("guildScanned", memberData).then(() => {
            updatelb(client)
            isScanning = false
          })
            /*fs.writeFile("./guildScanned.json", JSON.stringify(memberData, null, 2), err => {
                if (err) {
                  console.log('Error writing file', err)
                } else {
                  console.log('Successfully wrote file')
                }
            })*/
            //console.log(memberData)
            console.log(errorThrow)
        }
    }
}

function getScanStatus() {
  return isScanning
}

exports.scanGuild = scanGuild;
exports.getScanStatus = getScanStatus;