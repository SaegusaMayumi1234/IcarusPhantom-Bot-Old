const axios = require('axios')
const apiKeyHandler = require('./apiKeyHandler')

//404 invalid username, not playing skyblock
//403 invalid apikey
//429 rate limited
//502 api not reachable
//500 internal error


function getMojang(name) {
  return axios.get("https://api.mojang.com/users/profiles/minecraft/" + name, {
    timeout: 10000
  }).then(mojang => {
    return {
      status: 200,
      uuid: mojang.data.id.replace(/-/g, "")
    }
  }).catch(error => {
    if (error.response !== undefined) {
      if (error.response.status == 404 || error.response.status == 400) {
        return {
          status: 404,
          cause: "invalid username"
        }
      }
    } else {
      if (error.code === "ECONNRESET" || error.code === "ETIMEDOUT" || error.code === "ECONNABORTED") {
        return {
          status: 502,
          cause: "Can't reach the api"
        }
      } else {
        return { 
          status: 500,
          cause: "There is a system error! Please report this to IcarusPhantom"
        }
      }
    }
  })
}

function gethypixel(uuid, apikey) {
  return axios.get('https://api.hypixel.net/skyblock/profiles?key=' + apikey + '&uuid=' + uuid, {
    timeout: 10000
  }).then(skyblock => {
    if (skyblock.data.profiles == null) {
      return {
        status: 404,
        cause: "This user is not playing skyblock"
      }
    }
    return {
      status: 200,
      data: skyblock.data.profiles
    }
  }).catch(error => {
    if (error.response !== undefined) {
      let status = 502
      let cause = ""
      if (error.response.status === 403 || error.response.status === 400) {
        status = 403
        cause = "Invalid API key please report this to IcarusPhantom"
      } else if (error.response.status === 429) {
        status = 429
        cause = "API Key get rate limited please wait a little bit"
      } else if (error.response.status >= 500) {
        status = 502
        cause = "Can't reach hypixel api please wait a little bit"
      }
      return {
        status: status,
        cause: cause
      }
    } else {
      if (error.code === "ECONNRESET" || error.code === "ETIMEDOUT" || error.code === "ECONNABORTED") {
        return {
          status: 502,
          cause: "Can't reach the api"
        }
      } else {
        return { 
          status: 500,
          cause: "There is a system error! Please report this to IcarusPhantom"
        }
      }
    }
  })
}

function getMaro(memberData, uuid) {
  return axios.post(`https://IcarusPhantom-API.saegusamayumi.repl.co/api/networth/categories`, {
    "data": memberData,
  }).then(res => {
    const maro = res.data
    return {
      status: 200,
      total: maro.data//(maro.data.networth != null || maro.data.networth != undefined ? maro.data.networth : 0) + (maro.data.bank != null || maro.data.bank != undefined ? maro.data.bank : 0) + (maro.data.sacks != null || maro.data.sacks != undefined ? maro.data.sacks : 0) + (maro.data.purse != null || maro.data.purse != undefined ? maro.data.purse : 0)
    }
  }).catch(error => {
    if (error.response !== undefined) {
      return error.response.data
    } else {
      if (error.code === "ECONNRESET" || error.code === "ETIMEDOUT" || error.code === "ECONNABORTED") {
        return {
          status: 502,
          cause: "Can't reach the api"
        }
      } else {
        return { 
          status: 500,
          cause: "There is a system error! Please report this to IcarusPhantom"
        }
      }
    }
  })
}

function getOtherNw(memberData, uuid) {
  return axios.post(`http://hypixelskyblock.superbonecraft.dk:8000/pages/${uuid}`, 
    memberData,
  ).then(maro => {
    return {
      status: 200,
      total: maro.data//Math.floor(maro.data.data.total)
    }
  }).catch(error => {
    if (error.response !== undefined) {
      return error.response.data
    } else {
      if (error.code === "ECONNRESET" || error.code === "ETIMEDOUT" || error.code === "ECONNABORTED") {
        return {
          status: 502,
          cause: "Can't reach the api"
        }
      } else {
        return { 
          status: 500,
          cause: "There is a system error! Please report this to IcarusPhantom"
        }
      }
    }
  })
}

async function getnwall(name) {
  var apikey = await apiKeyHandler.get()
  let mojang = await getMojang(name)
  let uuid
  if (mojang.status === 200) {
    uuid = mojang.uuid
  } else {
    return mojang
  }
  let skyblock = await gethypixel(uuid, apikey)
  if (skyblock.status !== 200) {
    return skyblock
  }
  let profileDataArray = skyblock.data
  let profileData = null
  let lastSaveArray = []
  profileDataArray.forEach(item => {
    lastSaveArray.push(item.members[uuid].last_save)
  })
  let largest = lastSaveArray[0];
  for (let i = 0; i < lastSaveArray.length; i++) {
    if (largest < lastSaveArray[i] ) {
      largest = lastSaveArray[i];
    }
  }
  profileDataArray.forEach(item => {
    if (item.members[uuid].last_save === largest) {
      profileData = item
    }
  })
  let memberData = profileData.members[uuid]
  if (profileData.banking !== undefined) {
    memberData.banking = profileData.banking
  }
  let maro = getMaro(memberData, uuid)
  //let other = getOtherNw(skyblock.data, uuid)
  return maro
}

exports.getnwall = getnwall;